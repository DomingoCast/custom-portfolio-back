import { Request } from "express";
import { User } from "../../../core/domain/user/User";
import registerUser from "../../../core/use-cases/register-user";
import { DataSource } from "typeorm";
import createUserRepository from "../../../infrastructure/persistance/user/user.datasource";

const registerController = async (
    req: Request<{}, {}, Omit<User, "id">>,
    dataSource: DataSource
): Promise<Omit<User, "password"> | string> => {
    const user: Omit<User, "id"> = req.body;
    // const userRepository = createUserRepository(dataSource);
    // const newUser: null | User = await registerUser(user, userRepository);
    const newUser: null | User = await container.resolve("registerUser")(user);
    if (newUser) {
        const partialUser = { ...newUser, password: "***" };
        return partialUser;
    }
    return "There has been an error";
};

export default registerController;
