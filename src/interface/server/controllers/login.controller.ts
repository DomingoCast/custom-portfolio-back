import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container!.cradle;
    try {
        const loginInfo = req.body;
        const validate = validateLogin(loginInfo);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const response = container.loginUseCase(req.body);
        return res.status(200).send({ message: response });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default loginController;
