import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import CustomError from "../../../infrastructure/errors/custom-error";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container?.cradle;
    try {
        let loginInfo = req.body;
        if (req.body !== null) {
            loginInfo = trimFields(req.body, arrayExceptions);
            container.logger.info("Trim fields from login info");
        }
        const validate = validateLogin(loginInfo);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const response: Omit<LoginInfo, "password"> =
            container.loginUseCase(loginInfo);
        const token: string = container.accessToken.create(response);
        container.logger.info("TokenAccess created");
        container.logger.info(response);
        return res.status(200).send({ message: { token: token } });
    } catch (error: any) {
        container.logger.error(error);
        throw new CustomError(error);
    }
};

export default loginController;
