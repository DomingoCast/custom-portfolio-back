import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class NotFoundRequestError extends HttpError {
    constructor(error: Error) {
        super(error.message, httpStatusCodes.NOT_FOUND);
        this.name = "NotFoundRequestError";
        this.stack = error.stack;
        Object.setPrototypeOf(this, NotFoundRequestError.prototype);
        this.statusCode = httpStatusCodes.NOT_FOUND;
        this.responseBody = error.message;
    }
}
export default NotFoundRequestError;
