import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class BadRequestError extends HttpError {
    constructor(error: Error) {
        super(error.message, httpStatusCodes.BAD_REQUEST);
        this.name = "BadRequestError";
        this.stack = error.stack;
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.statusCode = httpStatusCodes.BAD_REQUEST;
        this.responseBody = error.message;
    }
}
export default BadRequestError;
