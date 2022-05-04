import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<void | Response> => {
    const container = req.container!.cradle;
    try {
        const loginInfo = req.body;
        const validate = validateLogin(loginInfo);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const response = container.loginUseCase(req.body);
        container.logger.info(response);
        return res.status(200).send({ message: response });
    } catch (error: any) {
        next(error);
    }
};

export default loginController;
