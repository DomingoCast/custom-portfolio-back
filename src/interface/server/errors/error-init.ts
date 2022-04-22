export class CustomError extends Error {
    statusCode = 400;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
        return "Something went wrong: " + this.message;
    }
}
export default CustomError;
