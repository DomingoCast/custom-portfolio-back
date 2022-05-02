import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import CustomError from "../../../infrastructure/errors/custom-error";

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
        container.logger.info(response);
        return res.status(200).send({ message: response });
    } catch (error: any) {
        container.logger.error(error);
        throw new CustomError(error);
    }
};

export default loginController;
