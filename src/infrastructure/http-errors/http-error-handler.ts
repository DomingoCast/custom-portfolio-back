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

const httpErrorHandler = (error: unknown): unknown => {
    try {
        if (error instanceof NotFoundError) {
            throw new NotFoundRequestError(error.message);
        }
        if (error instanceof BadRequestError) {
            throw new BadRequestError(error.message);
        }
        if (error instanceof ConflictError) {
            throw new ConflictRequestError(error.message);
        }
        if (error instanceof ForbiddenError) {
            throw new ForbiddenRequestError(error.message);
        }
        if (error instanceof UnauthorizedError) {
            throw new UnauthorizedRequestError(error.message);
        }
        if (error instanceof Error) {
            throw new InternalServerError(
                error.message || "Internal server error"
            );
        }
    } catch (error) {
        return error;
    }
};
export default httpErrorHandler;
