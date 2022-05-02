import { AwilixContainer } from "awilix";
import { Request, Response } from "express";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<void | Response> => {
    const container = req.container?.cradle!;
    try {
        const response = await container.loginUseCase(req.body);
        container.logger.info(response);
        return res.status(200).send({ message: response });
    } catch (error: any) {
        next(error);
    }
};

export default loginController;
