import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class ConflictRequestError extends HttpError {
    constructor(error: Error) {
        super(error.message, httpStatusCodes.CONFLICT);
        this.name = "ConflictRequestError";
        this.stack = error.stack;
        Object.setPrototypeOf(this, ConflictRequestError.prototype);
        this.statusCode = httpStatusCodes.CONFLICT;
        this.responseBody = error.message;
    }
}
export default ConflictRequestError;
