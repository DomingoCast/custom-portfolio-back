import { Request, Response } from "express";
import { User } from "../../../core/domain/user/user";
import { AwilixContainer } from "awilix";
import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";

type CustomRequest = Request<{}, {}, Omit<User, "id">> & {
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    try {
        const container = req.container!;
        let dataForm: any = req.body;
        if (req.body !== null) {
            dataForm = trimFields(req.body);
        }
        const validate = validateUserDataForm(dataForm);
        if (validate !== true)
            return res.status(400).send({ message: validate });
        const user: Omit<User, "id"> = dataForm;

        const newUser: null | User = await container.cradle.registerUserUseCase(
            user
        );
        if (newUser) {
            const partialUser = { ...newUser, password: "***" };

            return res.status(200).send({ message: partialUser });
        }
        return res.status(409).send({ message: "User already exits" });
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default registerController;
