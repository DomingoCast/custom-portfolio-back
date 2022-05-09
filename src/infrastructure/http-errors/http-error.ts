import CustomError from "../errors/custom-error";

class HttpError extends CustomError {
    statusCode: number;
    responseBody: string;
    constructor(responseBody: string, statusCode: number) {
        super(responseBody || "An error had occurred");
        this.name = "HttpError";
        Object.setPrototypeOf(this, HttpError.prototype);
        this.statusCode = statusCode;
        this.responseBody = responseBody;
    }
}
export default HttpError;
