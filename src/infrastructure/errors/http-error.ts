import CustomError from "./custom-error";
type ResponseData = {
    statusCode: number;
    responseBody: string;
};
class HttpError extends CustomError {
    statusCode: number;
    responseBody: string;
    constructor(responseData: ResponseData) {
        super(responseData.responseBody || "An error had occurred");
        this.name = "HttpError";
        Object.setPrototypeOf(this, HttpError.prototype);
        this.statusCode = responseData.statusCode;
        this.responseBody = responseData.responseBody;
    }
}
export default HttpError;
