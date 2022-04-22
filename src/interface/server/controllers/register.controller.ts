import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import Email from "../../../core/domain/email/Email";
import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";
import { AwilixContainer } from "awilix";
import CustomError from "../errors/error-init";

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
            const err = new CustomError("validate");
            return res
                .status(err.statusCode)
                .send({ message: err.getErrorMessage() });
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

            return res.status(200).send({ message: partialUser });
        }
        return res.status(400).send({ message: "User already exits" });
    } catch (e) {
        const err = new CustomError("e");
        return res
            .status(err.statusCode)
            .send({ message: err.getErrorMessage() });
    }
};

export default registerController;
