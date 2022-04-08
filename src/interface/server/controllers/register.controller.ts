import { Request } from "express";
import { User } from "../../../core/domain/user/User";
import registerUser from "../../../core/use-cases/register-user";
import { DataSource } from "typeorm";
import createUserRepository from "../../../infrastructure/persistance/user/user.datasource";
import createHashFunction from "../../../infrastructure/password/create-hash-function";

const registerController = async (
    req: Request<{}, {}, Omit<User, "id">>,
    dataSource: DataSource
): Promise<Omit<User, "password"> | string> => {
    const userRepository = createUserRepository(dataSource);
    const hashFunction = createHashFunction();
    const user: Omit<User, "id"> = req.body;
    const newUser: null | User = await registerUser(
        user,
        userRepository,
        hashFunction
    );
    if (newUser) {
        const partialUser = { ...newUser, password: "***" };
        return partialUser;
    }
    return "There has been an error";
};

export default registerController;
