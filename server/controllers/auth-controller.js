import userService from '../services/user-service.js';

class AuthController {
    async registration(req, res, next) {
        try {
            const { name, age, email, password, avatar } = req.body;

            const userData = await userService.registration(
                name,
                age,
                avatar,
                email,
                password
            );

            const maxAge = Number(process.env.COOKIE_REFRESH_TOKEN_EXPIRES);
            res.cookie('refreshToken', userData.tokens.refreshToken, {
                httpOnly: true,
                maxAge,
            });

            return res.json({
                user: userData.user,
                token: userData.tokens.accessToken,
            });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            const maxAge = Number(process.env.COOKIE_REFRESH_TOKEN_EXPIRES);
            res.cookie('refreshToken', userData.tokens.refreshToken, {
                httpOnly: true,
                maxAge,
            });
            return res.json({
                user: userData.user,
                token: userData.tokens.accessToken,
            });
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({ message: 'Logout' });
        } catch (e) {
            next(e);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refreshToken(refreshToken);
            const maxAge = Number(process.env.COOKIE_REFRESH_TOKEN_EXPIRES);
            res.cookie('refreshToken', userData.tokens.refreshToken, {
                httpOnly: true,
                maxAge,
            });

            return res.json({
                user: userData.user,
                token: userData.tokens.accessToken,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new AuthController();
