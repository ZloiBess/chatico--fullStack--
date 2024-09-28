import { body, validationResult } from 'express-validator';
import ApiError from '../errors/api-error.js';

const validatorRegistrationMiddleware = [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
    body('name').notEmpty(),
    body('age').notEmpty(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw ApiError.BadRequest('Error registration', errors.array());
        }
        next();
    },
];

export default validatorRegistrationMiddleware;
