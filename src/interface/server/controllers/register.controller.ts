import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import Email from "../../../core/domain/email/Email";
import validateUserDataForm from "../../../infrastructure/user/user-validate/validate-user-data-form";
import { AwilixContainer } from "awilix";

type CustomRequest = Request & {
    body: Omit<User, "id">;
    container: AwilixContainer;
};

const registerController = async (
    req: CustomRequest, //Request<{}, {}, Omit<User, "id">>,
    res: Response
): Promise<Response> => {
    try {
        const dataForm = req.body;
        const validate = validateUserDataForm(dataForm);
        if (validate !== true)
            return res.status(409).send({ message: validate });
        const user: Omit<User, "id"> = req.body;
        const newUser: null | User =
            await req.container.cradle.registerUserUseCase(user);
        if (newUser) {
            const partialUser = { ...newUser, password: "***" };
            const email: Email = {
                receiver: partialUser.email,
                subject: "REGISTER",
                text: "you've been registered!",
            };

            await req.container.cradle.sendEmailUseCase(email);

            return res.status(200).send({ message: partialUser });
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
