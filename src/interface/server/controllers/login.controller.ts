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
import { User } from "../../../core/domain/user/user";

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
        console.log(loginInfo);
        if (req.body !== null) {
            loginInfo = trimFields(req.body, arrayExceptions);
            console.log(loginInfo);
            container.logger.info("Trim fields from login info");
        }
        const validate = validateLogin(loginInfo);
        if (validate !== true) throw new BadRequestError(validate.toString());
        const response: User = await container.loginUseCase(loginInfo);
        const token: string = container.accessToken.create(response);
        container.logger.info("Correct login: " + JSON.stringify(response));
        container.logger.info("TokenAccess created");
        console.log("[REQ]", req.cookies);
        return res
            .status(200)
            .cookie("token", token)
            .send({ token: token, userId: response.id });
    } catch (error: unknown) {
        let errorMessage = "Error ocurred into login controller";
        if (error instanceof CustomError) {
            errorMessage = error.message;
            httpHandlerError(error, next);
        }
        httpHandlerError(new InternalServerError(errorMessage), next);
        container.logger.error(errorMessage);
    }
};

export default loginController;
