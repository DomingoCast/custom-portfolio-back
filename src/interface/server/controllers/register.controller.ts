import { Request } from "express";
import { User } from "../../../core/domain/user/User";
import registerUser from "../../../core/use-cases/register-user";
import { DataSource } from "typeorm";
import createUserRepository from "../../../infrastructure/persistance/user/user.datasource";
import validateUserDataForm from "../../../infrastructure/User/user-validate/validate-user-data-form";

const registerController = async (
    req: Request<{}, {}, Omit<User, "id">>,
    dataSource: DataSource
): Promise<Omit<User, "password"> | string> => {
    const dataForm = req.body;
    const validate = validateUserDataForm(dataForm);
    if (validate !== true) return " " + validate;
    const userRepository = createUserRepository(dataSource);
    const user: Omit<User, "id"> = req.body;
    const newUser: null | User = await registerUser(user, userRepository);
    if (newUser) {
        const partialUser = { ...newUser, password: "***" };
        return partialUser;
    }
    return "There has been an error";
};

export default registerController;
