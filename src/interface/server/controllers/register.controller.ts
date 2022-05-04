import { Request, Response } from "express";
import { User } from "../../../core/domain/user/user";
import { AwilixContainer } from "awilix";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import CustomError from "../../../infrastructure/errors/custom-error";
import validateUser from "../../../infrastructure/user/validate-user/validate-user";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";

type CustomRequest = Request<{}, {}, Omit<User, "id">> & {
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<void | Response> => {
    try {
        const container = req.container?.cradle!;
        let dataForm: any = req.body;
        if (req.body !== null) {
            dataForm = trimFields(req.body, arrayExceptions);
            container.logger.info("Trim fields from data form");
        }

        const validate = validateUser(dataForm);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const user: Omit<User, "id"> = dataForm;
        const response: null | User = await container.registerUserUseCase(user);
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
