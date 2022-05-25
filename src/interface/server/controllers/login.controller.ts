import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";
import httpErrorHandler from "../../../infrastructure/http-errors/http-error-handler";
import CustomError from "../../../core/errors/custom-error";
import InternalServerError from "../../../infrastructure/http-errors/internal-error";
import InternalBadRequestError from "../../../core/errors/internal-bad-request-error";

type CustomRequest = Request<{}, {}, LoginInfo> & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const container = req.container?.cradle;
    try {
        let loginInfo = req.body;
        if (req.body !== null) {
            loginInfo = trimFields(req.body, arrayExceptions);
            container.logger.info("Trim fields from login info");
        }
        const validate = validateLogin(loginInfo);
        if (validate !== true)
            throw new InternalBadRequestError(validate.toString());
        const response: Omit<LoginInfo, "password"> =
            await container.loginUseCase(loginInfo);
        const token: string = container.accessToken.create(response);
        container.logger.info("Correct login: " + JSON.stringify(response));
        container.logger.info("TokenAccess created");
        return res.status(200).send({ token: token });
    } catch (error: unknown) {
        if (error instanceof CustomError) next(httpErrorHandler(error));
        next(httpErrorHandler(new InternalServerError(error as CustomError)));
    }
};

export default loginController;
