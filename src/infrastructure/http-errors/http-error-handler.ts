import ConflictError from "../../core/errors/conflict-error";
import NotFoundError from "../../core/errors/not-found-error";
import BadRequestError from "./bad-request-error";
import ConflictRequestError from "./conflict-request-error";
import NotFoundRequestError from "./not-found-request-error";
import InternalServerError from "./internal-error";
import { NextFunction } from "express";
import ForbiddenError from "../../core/errors/forbidden-error";
import ForbiddenRequestError from "./forbidden-request-error";

const httpHandlerError = (error: any, next: NextFunction) => {
    if (error instanceof NotFoundError) {
        next(new NotFoundRequestError(error.message));
        return;
    }
    if (error instanceof BadRequestError) {
        next(new BadRequestError(error.message));
        return;
    }
    if (error instanceof ConflictError) {
        next(new ConflictRequestError(error.message));
        return;
    }
    if (error instanceof ForbiddenError) {
        next(new ForbiddenRequestError(error.message));
        return;
    }
    next(new InternalServerError(error.message));
};
export default httpHandlerError;
