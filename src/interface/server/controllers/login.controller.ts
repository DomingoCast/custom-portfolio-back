import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";
import BadRequestError from "../../../infrastructure/http-errors/bad-request-error";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";
import CustomError from "../../../core/errors/custom-error";
import InternalServerError from "../../../infrastructure/http-errors/internal-error";

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
        if (validate !== true) throw new BadRequestError(validate.toString());
        const response: Omit<LoginInfo, "password"> =
            await container.loginUseCase(loginInfo);
        const token: string = container.accessToken.create(response);
        container.logger.info("TokenAccess created");
        container.logger.info(response);
        return res.status(200).send({ token: token });
    } catch (error: unknown) {
        let errorMessage = "";
        if (error instanceof CustomError) {
            errorMessage = error.message;
            container.logger.error(errorMessage);
            httpHandlerError(error, next);
        }
        if (!(error instanceof CustomError)) {
            errorMessage = "Error ocurred into login controller";
            container.logger.error(errorMessage);
            httpHandlerError(new InternalServerError(errorMessage), next);
        }
    }
};

export default loginController;
