import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import CustomError from "../../../../core/errors/custom-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const getCollectionController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    const response: null | User = await container.getCollectionAndPosts(
        req.params.collectionId
    );
    if (response) {
        container.logger.info(response);
        return res.status(200).send({ collection: response });
    }
    throw new CustomError("something went wrong");
};

export default getCollectionController;
