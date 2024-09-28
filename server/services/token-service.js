import tokenModel from '../models/token-model.js';
import TokenModel from '../models/token-model.js';
import jwt from 'jsonwebtoken';
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
        });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
        });
        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId, refreshToken, session) {
        try {
            const tokenFromDatabase = await TokenModel.findOne({
                user: userId,
            });
            if (tokenFromDatabase) {
                await TokenModel.deleteOne({ user: userId }, session);
            }
            await TokenModel.create([{ user: userId, refreshToken }], {
                session,
            });
            return true;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async removeToken(refreshToken) {
        await tokenModel.deleteOne({ refreshToken });
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        return await tokenModel.findOne({ refreshToken });
    }
}

export default new TokenService();
