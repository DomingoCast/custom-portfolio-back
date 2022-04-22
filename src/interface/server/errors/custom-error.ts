class CustomError extends Error {
    static getCustomMessage: any;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getCustomMessage() {
        return "An error had occurred: " + this.message;
    }
}
export default CustomError;
