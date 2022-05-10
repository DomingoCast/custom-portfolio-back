import ConflictError from "../../core/errors/conflict-error";
import NotFoundError from "../../core/errors/not-found-error";
import BadRequestError from "./bad-request-error";
import ConflictRequestError from "./conflict-request-error";
import NotFoundRequestError from "./not-found-request-error";
import InternalServerError from "./internal-error";
import { NextFunction } from "express";

const httpHandlerError = (error: any, next: NextFunction) => {
    if (error instanceof NotFoundError) {
        next(new NotFoundRequestError(error.message));
        return;
    } else if (error instanceof BadRequestError) {
        next(new BadRequestError(error.message));
        return;
    } else if (error instanceof ConflictError) {
        next(new ConflictRequestError(error.message));
        return;
    }
    next(new InternalServerError(error.message));
};
export default httpHandlerError;
