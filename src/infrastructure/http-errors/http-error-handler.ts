import ConflictError from "../../core/errors/conflict-error";
import NotFoundError from "../../core/errors/not-found-error";
import BadRequestError from "./bad-request-error";
import ConflictRequestError from "./conflict-request-error";
import NotFoundRequestError from "./not-found-request-error";
import InternalServerError from "./internal-error";
import { NextFunction } from "express";
import UnauthorizedError from "../../core/errors/unauthorized.error";
import UnauthorizedRequestError from "./unauthorized-request-error";

const httpHandlerError = (error: Error, next: NextFunction): void => {
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
    if (error instanceof UnauthorizedError) {
        next(new UnauthorizedRequestError(error.message));
        return;
    }
    if (error.message) {
        next(new InternalServerError(error.message));
        return;
    }
    next(error);
};
export default httpHandlerError;
