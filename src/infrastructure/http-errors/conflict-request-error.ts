import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class ConflictRequestError extends HttpError {
    constructor(responseBody: string) {
        super(responseBody, httpStatusCodes.CONFLICT);
        this.name = "ConflictRequestError";
        Object.setPrototypeOf(this, ConflictRequestError.prototype);
        this.statusCode = httpStatusCodes.CONFLICT;
        this.responseBody = responseBody;
    }
}
export default ConflictRequestError;
