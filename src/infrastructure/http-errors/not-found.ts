import HttpError from "./error";
import httpStatusCodes from "./status-codes";
class NotFoundRequest extends HttpError {
    constructor(
        responseBody: any,
        statusCode: number = httpStatusCodes.NOT_FOUND
    ) {
        super(responseBody, statusCode);
        this.name = "NotFound";
        Object.setPrototypeOf(this, NotFoundRequest.prototype);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
export default NotFoundRequest;
