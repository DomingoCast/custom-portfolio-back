import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import Email from "../../../core/domain/email/Email";
import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";
import { AwilixContainer } from "awilix";
import getLogger from "../logger/get-logger";

type CustomRequest = Request<{}, {}, Omit<User, "id">> & {
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    try {
        const container = req.container!;
        const dataForm = req.body;
        const validate = validateUserDataForm(dataForm);
        if (validate !== true) {
            getLogger().error({ registerValidate: validate });
            return res.status(409).send({ message: validate });
        }
        const user: Omit<User, "id"> = req.body;
        const newUser: null | User = await container.cradle.registerUserUseCase(
            user
        );
        if (newUser) {
            const partialUser = { ...newUser, password: "***" };
            const email: Email = {
                receiver: partialUser.email,
                subject: "REGISTER",
                text: "you've been registered!",
            };

            await container.cradle.sendEmailUseCase(email);
            await container.cradle
                .getLogger()
                .info({ "User registered well": partialUser });
            return res.status(200).send({ message: partialUser });
        }
        getLogger().error({ message: "User already exits" });
        return res.status(400).send({ message: "User already exits" });
    } catch (e) {
        getLogger().error({ message: e });
        return res.status(500).send({
            message: e,
        });
    }
};

export default registerController;
