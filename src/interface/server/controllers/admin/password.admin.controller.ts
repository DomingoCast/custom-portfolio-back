import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import validatePassword from "../../../../infrastructure/user/validate-password/validate-password";

type CustomRequest = Request<{}, {}, { password: string }> & {
    container?: AwilixContainer;
};

const passwordAdminController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const password = req.body;
        const token = req.headers.token;
        const validate = validatePassword(password);
        if (validate !== true) {
            container.logger.error(validate);
            return res
                .status(400)
                .send({ message: validate, casa: req.header });
        }
        const decoded = container.accessToken.verify(token);

        const response: null | User = await container.passwordUserUseCase(
            decoded.data.id,
            password.password
        );
        if (response) {
            container.logger.info(response);
            return res
                .status(200)
                .send({ message: "User has been passworded" });
        }
        container.logger.error("User already exits");
        return res.status(409).send({ message: "User already exits" });
    } catch (e) {
        httpHandlerError(e, next);
    }
};

export default passwordAdminController;
