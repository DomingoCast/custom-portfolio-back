import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import CustomError from "../../../core/errors/custom-error";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";
import { CustomRequest } from "../controllers/types/custom-request";

export const controllerWrapper = (
    controller: (req: CustomRequest, res: Response) => Promise<Response | void>
) => {
    const run = async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ) => {
        const container = req.container?.cradle;
        try {
            await controller(req, res);
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
