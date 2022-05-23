import ConflictError from "../../core/errors/conflict-error";
import NotFoundError from "../../core/errors/not-found-error";
import BadRequestError from "./bad-request-error";
import ConflictRequestError from "./conflict-request-error";
import NotFoundRequestError from "./not-found-request-error";
import InternalServerError from "./internal-error";
import ForbiddenError from "../../core/errors/forbidden-error";
import ForbiddenRequestError from "./forbidden-request-error";
import UnauthorizedError from "../../core/errors/unauthorized.error";
import UnauthorizedRequestError from "./unauthorized-request-error";
import HttpError from "./http-error";
import CustomError from "../../core/errors/custom-error";

const httpErrorHandler = (error: CustomError): HttpError => {
    if (error instanceof NotFoundError) {
        return new NotFoundRequestError(error.message);
    }
    if (error instanceof BadRequestError) {
        return new BadRequestError(error.message);
    }
    if (error instanceof ConflictError) {
        return new ConflictRequestError(error.message);
    }
    if (error instanceof ForbiddenError) {
        return new ForbiddenRequestError(error.message);
    }
    if (error instanceof UnauthorizedError) {
        return new UnauthorizedRequestError(error.message);
    }
    if (error instanceof CustomError) {
        return new InternalServerError(
            error.message || "Internal server error"
        );
    }
    return new InternalServerError("Internal server unknown error");
};
export default httpErrorHandler;
