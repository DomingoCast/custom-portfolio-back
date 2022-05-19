import CustomError from "./custom-error";

class ForbiddenError extends CustomError {
    constructor(message?: string) {
        super(message || "Forbidden");
        this.name = "ForbiddenError";
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
export default ForbiddenError;
