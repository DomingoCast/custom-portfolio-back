import ConflictError from "../../core/errors/conflict-error";
import NotFoundError from "../../core/errors/not-found-error";
import BadRequestError from "./bad-request-error";
import ConflictRequestError from "./conflict-request-error";
import NotFoundRequestError from "./not-found-request-error";
import InternalServerError from "./internal-server-error";
import ForbiddenError from "../../core/errors/forbidden-error";
import ForbiddenRequestError from "./forbidden-request-error";
import UnauthorizedError from "../../core/errors/unauthorized.error";
import UnauthorizedRequestError from "./unauthorized-request-error";
import HttpError from "./http-error";
import CustomError from "../../core/errors/custom-error";
import InternalBadRequestError from "../../core/errors/internal-bad-request-error";

const httpErrorHandler = (error: CustomError): HttpError => {
    if (error instanceof NotFoundError) {
        return new NotFoundRequestError(error);
    }
    if (error instanceof InternalBadRequestError) {
        return new BadRequestError(error);
    }
    if (error instanceof ConflictError) {
        return new ConflictRequestError(error);
    }
    if (error instanceof ForbiddenError) {
        return new ForbiddenRequestError(error);
    }
    if (error instanceof UnauthorizedError) {
        return new UnauthorizedRequestError(error);
    }
    return new InternalServerError(error);
};
export default httpErrorHandler;
