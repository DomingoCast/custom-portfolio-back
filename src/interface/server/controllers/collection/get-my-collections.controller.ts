import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import CustomError from "../../../../core/errors/custom-error";
import InternalServerError from "../../../../infrastructure/http-errors/internal-server-error";

type CustomRequest = Request<
    {},
    {},
    Omit<Collection, "id" | "posts" | "user">
> & {
    container?: AwilixContainer;
    user?: User;
};

const getMyCollectionsController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    console.log("[RESPONSEasdfkhaskdlkhsa");
    const response: null | User = await container.getCollectionsUseCase(
        req.user
    );
    console.log("[RESPONSE", response);
    if (response) {
        container.logger.info(response);
        return res.status(200).send({ collections: response });
    }
    throw new CustomError("something went wrong");
};

export default getMyCollectionsController;
