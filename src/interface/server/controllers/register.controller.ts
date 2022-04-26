import { Request, Response } from "express";
import { User } from "../../../core/domain/user/user";
import Email from "../../../core/domain/email/Email";
import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";
import { AwilixContainer } from "awilix";

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
        if (validate !== true)
            return res.status(409).send({ message: validate });
        const user: Omit<User, "id"> = req.body;
        const response: null | string =
            await container.cradle.registerUserUseCase(user);
        if (response) {
            const email: Email = {
                receiver: user.email,
                subject: "REGISTER",
                text: "you've been registered!",
            };

            await container.cradle.sendEmailUseCase(email);

            return res.status(200).send({ message: response });
        }
        return res.status(400).send({ message: "User already exits" });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default registerController;
