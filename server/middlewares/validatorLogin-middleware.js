import { body, validationResult } from 'express-validator';
import ApiError from '../errors/api-error.js';

const validatorLoginMiddleware = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Error login', errors.array());
        }
        next();
    },
];

export default validatorLoginMiddleware;
