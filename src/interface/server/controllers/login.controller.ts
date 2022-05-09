import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";
import BadRequestError from "../../../infrastructure/http-errors/bad-request";
import NotFoundError from "../../../core/errors/not-found-error";
import NotFoundRequest from "../../../infrastructure/http-errors/not-found";

type CustomRequest = Request<{}, {}, LoginInfo> & {
    container?: AwilixContainer;
};

const loginController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<void | Response> => {
    try {
        const container = req.container?.cradle;
        let loginInfo: any = req.body;
        if (req.body !== null) {
            loginInfo = trimFields(req.body, arrayExceptions);
            container.logger.info("Trim fields from login info");
        }
        const validate = validateLogin(loginInfo);
        if (validate !== true) {
            container.logger.error(validate);
            throw new BadRequestError(validate);
        }
        const response: Omit<LoginInfo, "password"> =
            await container.loginUseCase(loginInfo);
        const token: string = container.accessToken.create(response);
        container.logger.info("TokenAccess created");
        container.logger.info(response);
        return res.status(200).send({ message: { token: token } });
    } catch (error) {
        console.log(error + "Llega a entrar");
        if (error instanceof NotFoundError) {
            console.log(error.message);
            throw new NotFoundRequest(error.message);
        }
        next(error);
    }
};

export default loginController;
