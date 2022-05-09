import HttpError from "./http-error";
import httpStatusCodes from "./http-status-codes";
class ConflictErrorRequest extends HttpError {
    constructor(
        responseBody: any,
        statusCode: number = httpStatusCodes.CONFLICT
    ) {
        super(responseBody, statusCode);
        this.name = "ConflictError";
        Object.setPrototypeOf(this, ConflictErrorRequest.prototype);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
export default ConflictErrorRequest;
