import { NextFunction, Response } from "express";
import CustomError from "../../../core/errors/custom-error";
import { CustomRequest } from "../controllers/types/custom-request";
import httpErrorHandler from "../../../infrastructure/http-errors/http-error-handler";
import InternalServerError from "../../../infrastructure/http-errors/internal-server-error";

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
        } catch (error: unknown) {
            if (error instanceof Error) {
                container.logger.error(error.toString());
                if (error instanceof CustomError) {
                    next(httpErrorHandler(error));
                }
                next(new InternalServerError(error));
            }
            container.logger.error("Error ocurred in controllerWrapper");
            console.log(error); // We dont know what is the error
        }
    };
    return run;
};
