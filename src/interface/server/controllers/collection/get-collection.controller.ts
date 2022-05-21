import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import InternalServerError from "../../../../infrastructure/http-errors/internal-error";

type CustomRequest = Request<
    {},
    {},
    Omit<Collection, "id" | "posts" | "user">
> & {
    container?: AwilixContainer;
    user?: User;
};

const getCollectionController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const response: null | User = await container.getCollectionUseCase(
            req.user
        );
        if (response) {
            container.logger.info(response);
            return res.status(200).send({ collection: response });
        }
        console.log("[CCCCCCCC]", response);
        throw new InternalServerError("something went wrong");
    } catch (e) {
        container.logger.error(e);
        httpHandlerError(e, next);
    }
};

export default getCollectionController;
