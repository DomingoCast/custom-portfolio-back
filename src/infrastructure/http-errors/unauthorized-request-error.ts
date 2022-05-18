import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class UnauthorizedRequestError extends HttpError {
    constructor(responseBody: string) {
        super(responseBody, httpStatusCodes.UNAUTHORIZED);
        this.name = "UnauthorizedRequestError";
        Object.setPrototypeOf(this, UnauthorizedRequestError.prototype);
        this.statusCode = httpStatusCodes.UNAUTHORIZED;
        this.responseBody = responseBody;
    }
}
export default UnauthorizedRequestError;
