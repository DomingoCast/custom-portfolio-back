import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import CustomError from "../../../core/errors/custom-error";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

export const controllerWrapper = (
    controller: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Response | void
) => {
    const run = async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ) => {
        const container = req.container?.cradle;
        try {
            await controller(req, res, next);
        } catch (error) {
            if (error instanceof CustomError) {
                container.logger.error(error.message);
                httpHandlerError(error, next);
            }
            next(error);
        }
    };
    return run;
};
