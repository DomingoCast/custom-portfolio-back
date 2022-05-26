import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import InternalServerError from "../../../../infrastructure/http-errors/internal-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};

const getUserController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        return res.status(200).send({ user: req.user! });
    } catch (e: any) {
        container.logger.error(e);
        httpHandlerError(e, next);
    }
};

export default getUserController;
