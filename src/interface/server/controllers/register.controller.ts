import { Response } from "express";
import { User } from "../../../core/domain/user/user";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import validateUser from "../../../infrastructure/user/validate-user/validate-user";
import { RegisterInfo } from "../../../core/domain/user/register-info";
import { Role } from "../../../core/domain/user/role.enum";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { CustomRequest } from "./types/custom-request";
import InternalBadRequestError from "../../../core/errors/internal-bad-request-error";

const registerController = async (
    req: CustomRequest,
    res: Response
): Promise<void | Response> => {
    const container = req.container?.cradle;
    let user: RegisterInfo = req.body;
    if (req.body !== null) {
        user = trimFields<RegisterInfo>(user, arrayExceptions);
        container.logger.info("Trim fields from data form");
    }

    const validate = validateUser(user);
    if (validate !== true)
        throw new InternalBadRequestError(validate.toString());
    const response: null | User = await container.registerUserUseCase(
        user,
        Role.worker
    );
    if (response) {
        container.logger.info("Correct register: " + JSON.stringify(response));
        return res.status(200).send({ message: "User has been registered" });
    }
    throw new InternalBadRequestError("An error has ocurred in the repository");
};

export default registerController;
