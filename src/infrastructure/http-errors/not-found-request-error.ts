import HttpError from "./http-error";
import httpStatusCodes from "./status-codes";
class NotFoundRequestError extends HttpError {
    constructor(responseBody: any) {
        super(responseBody, httpStatusCodes.NOT_FOUND);
        this.name = "NotFoundRequestError";
        Object.setPrototypeOf(this, NotFoundRequestError.prototype);
        this.statusCode = httpStatusCodes.NOT_FOUND;
        this.responseBody = responseBody;
    }
}
export default NotFoundRequestError;
