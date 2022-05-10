import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class InternalServerError extends HttpError {
    constructor(responseBody: any) {
        super(responseBody, httpStatusCodes.INTERNAL_SERVER);
        this.name = "InternalServerError";
        Object.setPrototypeOf(this, InternalServerError.prototype);
        this.statusCode = httpStatusCodes.INTERNAL_SERVER;
        this.responseBody = responseBody;
    }
}
export default InternalServerError;
