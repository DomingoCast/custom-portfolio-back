import HttpError from "./error";
import httpStatusCodes from "./status-codes";
class ConflictRequestError extends HttpError {
    constructor(
        responseBody: any,
        statusCode: number = httpStatusCodes.CONFLICT
    ) {
        super(responseBody, statusCode);
        this.name = "ConflictError";
        Object.setPrototypeOf(this, ConflictRequestError.prototype);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
export default ConflictRequestError;
