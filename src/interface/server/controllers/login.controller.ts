import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";
import BadRequestError from "../../../infrastructure/http-errors/bad-request-error";
import { CustomRequest } from "./types/custom-request";

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
    const response: Omit<LoginInfo, "password"> = await container.loginUseCase(
        loginInfo
    );
    const token: string = container.accessToken.create(response);
    container.logger.info("Correct login: " + JSON.stringify(response));
    container.logger.info("TokenAccess created");
    return res.status(200).send({ token: token });
};

export default loginController;
