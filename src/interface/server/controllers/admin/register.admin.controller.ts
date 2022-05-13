import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import { RegisterInfo } from "../../../../core/domain/user/register-info";
import { Role } from "../../../../core/domain/user/role.enum";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import validateUser from "../../../../infrastructure/user/validate-user/validate-user";

type CustomRequest = Request<{}, {}, RegisterInfo> & {
    container?: AwilixContainer;
};

const registerAdminController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const dataForm = req.body;
        const validate = validateUser(dataForm);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const user: RegisterInfo = req.body;
        const response: null | User = await container.registerUserUseCase(
            user,
            Role.admin
        );

        if (response) {
            container.logger.info(response);
            const token = container.accessToken.create({
                ...response,
                changePassword: true,
            });
            console.log(container.accessToken.verify(token));
            return res
                .status(200)
                .send({ message: "User has been registered", token: token });
        }
        container.logger.error("User already exits");
        return res.status(409).send({ message: "User already exits" });
    } catch (e) {
        httpHandlerError(e, next);
    }
};

export default registerAdminController;
