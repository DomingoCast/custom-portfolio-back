import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import CustomError from "../../../infrastructure/errors/custom-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container?.cradle!;
    try {
        const response = container.loginUseCase(req.body);
        container.logger.info(response);
        return res.status(200).send({ message: response });
    } catch (error: any) {
        container.logger.error(error);
        throw new CustomError(error);
    }
};

export default loginController;
