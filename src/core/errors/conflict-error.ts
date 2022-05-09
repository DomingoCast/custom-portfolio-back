import CustomError from "./custom-error";

class ConflictError extends CustomError {
    constructor(message?: string) {
        super(message || "Conflict in some field");
        this.name = "Conflict";
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
export default ConflictError;
