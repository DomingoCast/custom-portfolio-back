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
    console.log("HOLA?");
    const container = req.container!.cradle;
    console.log("[POST ID]", req.params.id);
    const response = await container.deletePostUseCase(req.params.id!);
    if (response) {
        console.log("ŸOOOkaa", response);
        container.logger.info(response);
        console.log(response.id);
        return res.status(200).send({ message: "Post has been deleted" });
    }
    console.log("ŸOOOO");
    throw new CustomError("Coud not delete the post");
};

export default deletePostController;
