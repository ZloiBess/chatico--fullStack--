class ApiError extends Error {
    constructor(status, message, arr = []) {
        super(message);
        this.status = status;
        this.arr = arr;
    }

    static BadRequest(message, arr) {
        return new ApiError(400, message, arr);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User Unauthorized');
    }
}

export default ApiError;
