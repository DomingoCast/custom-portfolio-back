import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import validateCollection from "../../../../infrastructure/user/validate-collection/validate-collection";

type CustomRequest = Request<{}, {}, Omit<Collection, "id" | "posts">> & {
    container?: AwilixContainer;
};

const postCollectionController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const collection = req.body;
        const validate = validateCollection(collection);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const response: null | User = await container.createCollectionUseCase();
        if (response) {
            container.logger.info(response);
            return res
                .status(200)
                .send({ message: "Collection has been created" });
        }
    } catch (e) {
        container.logger.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default postCollectionController;
