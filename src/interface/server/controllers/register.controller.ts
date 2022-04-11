import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import registerUser from "../../../core/use-cases/register-user";
import { DataSource } from "typeorm";
import createUserRepository from "../../../infrastructure/persistance/user/user.datasource";
import validateUserDataForm from "../../../infrastructure/User/user-validate/validate-user-data-form";

const registerController = async (
    req: Request<{}, {}, Omit<User, "id">>,
    dataSource: DataSource,
    res: Response
): Promise<Response> => {
    try {
        const dataForm = req.body;
        const validate = validateUserDataForm(dataForm);
        if (validate !== true)
            return res.status(409).send({ message: validate });
        const userRepository = createUserRepository(dataSource);
        const user: Omit<User, "id"> = req.body;
        const newUser: null | User = await registerUser(user, userRepository);
        if (newUser) {
            const partialUser = { ...newUser, password: "***" };
            return res.status(200).send({ message: partialUser });
        }
        return res.status(400).send({ message: "User already exits" });
    } catch (e) {
        return res.status(500).send({
            message: e,
        });
    }
};

export default registerController;