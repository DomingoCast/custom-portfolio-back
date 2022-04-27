import { Request, Response } from "express";
import { User } from "../../../core/domain/user/user";
import { AwilixContainer } from "awilix";
import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";

type CustomRequest = Request<{}, {}, Omit<User, "id">> & {
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container!;
    try {
        const dataForm = req.body;
        const validate = validateUserDataForm(dataForm);
        if (validate !== true) {
            container.cradle.logger.error({ "Bad Request": validate });
            return res.status(400).send({ message: validate });
        }
        const user: Omit<User, "id"> = req.body;
        const newUser: null | User = await container.cradle.registerUserUseCase(
            user
        );
        if (newUser) {
            const partialUser = { ...newUser, password: "***" };
            container.cradle.logger.info({ "User Well": partialUser });
            return res.status(200).send({ message: partialUser });
        }
        container.cradle.logger.error({ message: "User already exits" });
        return res.status(409).send({ message: "User already exits" });
    } catch (e) {
        container.cradle.logger.error({ message: e });
        return res.status(500).send({
            message: e,
        });
    }
};

export default registerController;
