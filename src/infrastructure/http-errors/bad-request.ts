import HttpError from "./error";
import httpStatusCodes from "./status-codes";
class BadRequestError extends HttpError {
    constructor(
        responseBody: any,
        statusCode: number = httpStatusCodes.BAD_REQUEST
    ) {
        super(responseBody, statusCode);
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
export default BadRequestError;
