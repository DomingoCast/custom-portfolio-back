import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class InternalServerError extends HttpError {
    constructor(error: Error) {
        super(error.message, httpStatusCodes.INTERNAL_SERVER);
        this.name = "InternalServerError";
        this.stack = error.stack;
        Object.setPrototypeOf(this, InternalServerError.prototype);
        this.statusCode = httpStatusCodes.INTERNAL_SERVER;
        this.responseBody = error.message;
    }
}
export default InternalServerError;
