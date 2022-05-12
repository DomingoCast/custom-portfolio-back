import CustomError from "./custom-error";

class NotFoundError extends CustomError {
    constructor(message?: string) {
        super(message || "Not found");
        this.name = "NotFound";
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
export default NotFoundError;
