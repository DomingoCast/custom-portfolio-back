class CustomError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
        return "Something went wrong: " + this.message;
    }
}
export default CustomError;
