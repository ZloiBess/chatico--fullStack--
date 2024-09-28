import UserModel from '../models/user-model.js';
import UserDto from '../dtos/user-dto.js';
import tokenService from './token-service.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import ApiError from '../errors/api-error.js';

class UserService {
    async registration(name, age, avatar, email, password) {
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            throw ApiError.BadRequest(`User with email: ${email} also exists`, [
                { path: 'email', msg: 'email is already registered' },
            ]);
        }

        const session = await mongoose.startSession();
        try {
            session.startTransaction();

            const hashPassword = await bcrypt.hash(password, 4);
            const user = await UserModel.create(
                [
                    {
                        name,
                        age,
                        avatar,
                        email,
                        password: hashPassword,
                    },
                ],
                { session }
            );

            const userDto = new UserDto(user[0]);
            const tokens = await this.#createTokens({ ...userDto }, session);

            await session.commitTransaction();
            return {
                user: { ...userDto },
                tokens,
            };
        } catch (e) {
            await session.abortTransaction();
            throw e;
        } finally {
            await session.endSession();
        }
    }

    async login(email, password) {
        const userFromDatabase = await UserModel.findOne({ email });
        if (!userFromDatabase) {
            throw ApiError.BadRequest('User not found');
        }

        const isPassEqual = await bcrypt.compare(
            password,
            userFromDatabase.password
        );

        if (!isPassEqual) {
            throw ApiError.BadRequest('User not found');
        }

        const userDto = new UserDto(userFromDatabase);
        const tokens = await this.#createTokens({ ...userDto });

        return {
            user: { ...userDto },
            tokens,
        };
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken);
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw ApiError.UnauthorizedError();
        }

        const isExistsToken = await tokenService.findToken(refreshToken);
        if (!isExistsToken) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = await this.#createTokens({ ...userDto });

        return {
            user: userDto,
            tokens,
        };
    }

    async getAll(neUser) {
        if (neUser) {
            const usersFromDataBase = await UserModel.find({
                _id: { $ne: neUser.id },
            });
            const users = usersFromDataBase.map((user) => new UserDto(user));
            return users;
        } else {
            throw ApiError.UnauthorizedError();
        }
    }

    async #createTokens(userDto, session) {
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken, session);
        return tokens;
    }
}

export default new UserService();
