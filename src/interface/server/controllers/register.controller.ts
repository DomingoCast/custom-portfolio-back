import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import Email from "../../../core/domain/email/Email";
import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";
import { AwilixContainer } from "awilix";
import HttpError from "../errors/http-error";

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
            const message = validate as string;
            const err = new HttpError(message, 409);
            return res
                .status(err.getErrorCode())
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
        const message = e as string;
        const err = new HttpError(message, 400);
        return res
            .status(err.getErrorCode())
            .send({ message: err.getErrorMessage() });
    }
};

export default registerController;
