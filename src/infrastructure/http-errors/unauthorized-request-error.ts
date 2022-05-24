import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class UnauthorizedRequestError extends HttpError {
    constructor(error: Error) {
        super(error.message, httpStatusCodes.UNAUTHORIZED);
        this.name = "UnauthorizedRequestError";
        this.stack = error.stack;
        Object.setPrototypeOf(this, UnauthorizedRequestError.prototype);
        this.statusCode = httpStatusCodes.UNAUTHORIZED;
        this.responseBody = error.message;
    }
}
export default UnauthorizedRequestError;
