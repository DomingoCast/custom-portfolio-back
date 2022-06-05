import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class ForbiddenRequestError extends HttpError {
    constructor(error: Error) {
        super(error.message, httpStatusCodes.FORBIDDEN);
        this.name = "ForbiddenRequestError";
        this.stack = error.stack;
        Object.setPrototypeOf(this, ForbiddenRequestError.prototype);
        this.statusCode = httpStatusCodes.FORBIDDEN;
        this.responseBody = error.message;
    }
}
export default ForbiddenRequestError;
