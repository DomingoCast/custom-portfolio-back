import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class BadRequestError extends HttpError {
    constructor(responseBody: string) {
        super(responseBody, httpStatusCodes.BAD_REQUEST);
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.statusCode = httpStatusCodes.BAD_REQUEST;
        this.responseBody = responseBody;
    }
}
export default BadRequestError;
