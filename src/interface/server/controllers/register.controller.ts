import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import registerUser from "../../../core/use-cases/register";
import { DataSource } from "typeorm";
import createUserRepository from "../../../infrastructure/user/user.datasource";

const registerController = async (
    req: Request,
    dataSource: DataSource
): Promise<Omit<User, "password"> | string> => {
    const userRepository = createUserRepository(dataSource);
    const user: Omit<User, "id"> = req.body;
    const newUser: void | User = await registerUser(user, userRepository);
    if (newUser) {
        const partialUser = { ...newUser, password: "***" };
        return partialUser;
    }
    return "There has been an error";
};

export default registerController;
