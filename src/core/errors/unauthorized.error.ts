import CustomError from "./custom-error";

class UnauthorizedError extends CustomError {
    constructor(message?: string) {
        super(message || "Unauthorized");
        this.name = "Unauthorized";
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
export default UnauthorizedError;
