import { Request, Response } from "express";
import { User } from "../../../core/domain/user/user";
import { AwilixContainer } from "awilix";
import validateUser from "../../../infrastructure/user/validate-user/validate-user";
import { nextTick } from "process";

type CustomRequest = Request<{}, {}, Omit<User, "id">> & {
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<any> /*Promise<Response>*/ => {
    try {
        const container = req.container?.cradle!;
        const dataForm = req.body;
        const validate = validateUser(dataForm);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const user: Omit<User, "id"> = req.body;
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
