import { Request, Response } from "express";
import { User } from "../../../core/domain/user/User";
import registerUser from "../../../core/use-cases/register";
import { createDBConnection } from "../../../infrastructure/postgres.datasources";
import createUserRepository from "../../../infrastructure/user/user.datasource";
import _ from "lodash";
import { DataSource } from "typeorm";

const registerController = async (req: Request, dataSource: DataSource) => {
    const userRepository = createUserRepository(
        // createDBConnection().DataSource
        dataSource
    );
    const user: Omit<User, "id"> = req.body;
    const newUser = await registerUser(user, userRepository);

    return _.omit(newUser!, "password");
};

export default registerController;
