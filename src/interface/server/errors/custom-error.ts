class CustomError extends Error {
    constructor(message: any) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getCustomMessage() {
        return "An error had occurred: " + this.message;
    }
}
export default CustomError;
