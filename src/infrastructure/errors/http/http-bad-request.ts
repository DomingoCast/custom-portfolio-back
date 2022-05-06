import HttpError from "./http-error";
import httpStatusCodes from "./http-status-codes";
class BadRequestError extends HttpError {
    constructor(
        responseBody: string,
        statusCode: number = httpStatusCodes.BAD_REQUEST
    ) {
        super(responseBody || "An error had occurred", statusCode);
        this.name = "BadRequestError";
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }

    returnResponse(res: any): void {
        res.status(this.statusCode).send(this.responseBody);
    }
}
export default BadRequestError;
