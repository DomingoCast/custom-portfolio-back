import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import validateCollection from "../../../../infrastructure/user/validate-collection/validate-collection";

type CustomRequest = Request<
    {},
    {},
    Omit<Collection, "id" | "posts" | "user">
> & {
    container?: AwilixContainer;
    user?: User;
};

const postCollectionController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        console.log("[QUE ESTÁ PASANDO????]", req.user);
        const collection = req.body;
        const validate = validateCollection(collection);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const response: null | User = await container.createCollectionUseCase({
            ...collection,
            thumbnail: req.file!.filename,
            user: req.user,
        });
        if (response) {
            container.logger.info(response);
            return res
                .status(200)
                .send({ message: "Collection has been created" });
        }
    } catch (e: any) {
        container.logger.error(e);
        httpHandlerError(e, next);
    }
};

export default postCollectionController;
