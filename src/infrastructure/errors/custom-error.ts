class CustomError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "CustomError";
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getCustomMessage(): string {
        return "An error had occurred: " + this.message;
    }
}
export default CustomError;
