import ApiError from '../errors/api-error.js';

const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, arr: err.arr });
    }

    return res.status(500).json({ message: 'Some error' });
};

export default errorMiddleware;
