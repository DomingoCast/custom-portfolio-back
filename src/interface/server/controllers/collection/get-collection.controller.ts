import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import InternalServerError from "../../../../infrastructure/http-errors/internal-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const getCollectionController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const response: null | User = await container.getCollectionAndPosts(
            req.params.collectionId
        );
        if (response) {
            container.logger.info(response);
            return res.status(200).send({ collection: response });
        }
        throw new InternalServerError("something went wrong");
    } catch (e) {
        container.logger.error(e);
        httpHandlerError(e, next);
    }
};

export default getCollectionController;
