import CustomError from "./custom-error";

class InternalBadRequestError extends CustomError {
    constructor(message?: string) {
        super(message || "Bad request");
        this.name = "BadRequest";
        Object.setPrototypeOf(this, InternalBadRequestError.prototype);
    }
}
export default InternalBadRequestError;
