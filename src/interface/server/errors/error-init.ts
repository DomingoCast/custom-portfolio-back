export class CustomError extends Error {
    statusCode: any;

    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.statusCode = statusCode;
    }

    getErrorMessage() {
        return "Something went wrong: " + this.message;
    }

    getErrorCode() {
        return this.statusCode;
    }
}
export default CustomError;
