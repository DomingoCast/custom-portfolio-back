import { AwilixContainer } from "awilix";
import { Request, Response } from "express";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    try {
        const container = req.container!;
        const response = container.cradle.loginUseCase(req.body);
        return res.status(200).send({ message: response });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default loginController;
