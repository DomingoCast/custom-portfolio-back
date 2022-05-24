import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";
import BadRequestError from "../../../infrastructure/http-errors/bad-request-error";
<<<<<<< HEAD
=======
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";
import CustomError from "../../../core/errors/custom-error";
import InternalServerError from "../../../infrastructure/http-errors/internal-error";
>>>>>>> 0ca474f9787331c214f67b8d9a1206ca3ec5c641

type CustomRequest = Request<{}, {}, LoginInfo> & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response
): Promise<void | Response> => {
    const container = req.container?.cradle;
    let loginInfo = req.body;
    if (req.body !== null) {
        loginInfo = trimFields(req.body, arrayExceptions);
        container.logger.info("Trim fields from login info");
    }
    const validate = validateLogin(loginInfo);
    if (validate !== true) throw new BadRequestError(validate.toString());
    const response: Omit<LoginInfo, "password"> =
        await container.loginUseCase(loginInfo);
    const token: string = container.accessToken.create(response);
    container.logger.info("Correct login: " + JSON.stringify(response));
    container.logger.info("TokenAccess created");
    return res.status(200).send({ token: token })
};

export default loginController;
