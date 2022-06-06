import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import CustomError from "../../../../core/errors/custom-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};

const deletePostController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    const response = await container.deletePostUseCase(req.params.id!);
    if (response) {
        container.logger.info(response);
        return res.status(200).send({ message: "Post has been deleted" });
    }
    throw new CustomError("Coud not delete the post");
};

export default deletePostController;
