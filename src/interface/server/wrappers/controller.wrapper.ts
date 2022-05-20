import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

export const controllerWrapper = (controller: Function) => {
    const run = async (req: CustomRequest, res: Response, next: any) => {
        const container = req.container!.cradle;
        try {
            await controller(req, res, next);
        } catch (error) {
            if (error instanceof Error) {
                container.logger.error(error.message);
                httpHandlerError(error, next);
            }
            next(error);
        }
    };
    return run;
};
