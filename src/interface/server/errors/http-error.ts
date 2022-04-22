import CustomError from "./custom-error";
class HttpError extends CustomError {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, HttpError.prototype);
        this.statusCode = statusCode;
    }

    getErrorMessage() {
        return "Something went wrong: " + this.message;
    }

    getErrorCode() {
        return this.statusCode;
    }
}
export default HttpError;
