import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import CustomError from "../../../core/errors/custom-error";
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
            if (error instanceof CustomError) {
                container.logger.error(error.message);
                httpHandlerError(error, next);
            }
            next(error);
        }
    };
    return run;
};
