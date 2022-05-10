import { Request, Response } from "express";
import { User } from "../../../core/domain/user/user";
import { AwilixContainer } from "awilix";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import validateUser from "../../../infrastructure/user/validate-user/validate-user";
import { RegisterInfo } from "../../../core/domain/user/register-info";
import { Role } from "../../../core/domain/user/role.enum";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";

type CustomRequest = Request<{}, {}, RegisterInfo> & {
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<void | Response> => {
    const container = req.container?.cradle;
    try {
        let user: RegisterInfo = req.body;
        if (req.body !== null) {
            user = trimFields<RegisterInfo>(user, arrayExceptions);
            container.logger.info("Trim fields from data form");
        }

        const validate = validateUser(user);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const response: null | User = await container.registerUserUseCase(
            user,
            Role.worker
        );
        if (response) {
            container.logger.info(response);
            return res
                .status(200)
                .send({ message: "User has been registered" });
        }
        container.logger.error("An error has ocurred in the repository");
        return res
            .status(500)
            .send({ message: "An error has ocurred in the repository" });
    } catch (error) {
        next(error);
    }
};

export default registerController;
