import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class ForbiddenRequestError extends HttpError {
    constructor(responseBody: string) {
        super(responseBody, httpStatusCodes.FORBIDDEN);
        this.name = "ForbiddenRequestError";
        Object.setPrototypeOf(this, ForbiddenRequestError.prototype);
        this.statusCode = httpStatusCodes.FORBIDDEN;
        this.responseBody = responseBody;
    }
}
export default ForbiddenRequestError;
