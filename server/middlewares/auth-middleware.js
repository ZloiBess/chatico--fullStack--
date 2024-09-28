import ApiError from '../errors/api-error.js';
import tokenService from '../services/token-service.js';

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
        return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
        return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
};

export default authMiddleware;
