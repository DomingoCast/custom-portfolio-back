import { Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import BadRequestError from "../../../infrastructure/http-errors/bad-request-error";
import { User } from "../../../core/domain/user/user";
import { CustomRequest } from "./types/custom-request";
import InternalBadRequestError from "../../../core/errors/internal-bad-request-error";

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
    if (validate !== true)
        throw new InternalBadRequestError(validate.toString());
    const response: User = await container.loginUseCase(loginInfo);
    const token: string = container.accessToken.create(response);
    container.logger.info("Correct login: " + JSON.stringify(response));
    container.logger.info("TokenAccess created");
    return res
        .status(200)
        .cookie("token", token)
        .send({ token: token, userId: response.id });
};

export default loginController;
