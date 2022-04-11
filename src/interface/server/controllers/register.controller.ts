import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import validateUserDataForm from "../../../infrastructure/User/user-validate/validate-user-data-form";
import { container } from "../../../infrastructure/dependency-injection/awilix-set-up";
import Email from "../../../core/domain/email/Email";

const registerController = async (
    req: Request<{}, {}, Omit<User, "id">>,
    res: Response
): Promise<Response> => {
    try {
        const dataForm = req.body;
        const validate = validateUserDataForm(dataForm);
        if (validate !== true)
            return res.status(409).send({ message: validate });
        const user: Omit<User, "id"> = req.body;
        const newUser: null | User = await container.resolve("registerUser")(
            user
        );
        if (newUser) {
            const partialUser = { ...newUser, password: "***" };
            const email: Email = {
                receiver: partialUser.email,
                subject: "REGISTER",
                text: "you've been registered!",
            };

            await container.resolve("sendEmail")(email);

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
