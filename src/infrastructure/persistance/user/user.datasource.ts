import UserRepository from "../../../core/ports/user-repository.port";
import { User } from "../../../core/domain/user/User";
import UserModel from "./user.model";
import { dataSource } from "../postgres.datasources";
import { DataSource } from "typeorm";

const createUserRepository = (
    appDataSource: DataSource = dataSource
): UserRepository => {
    const userRepository = appDataSource.getRepository(UserModel);
    const persist = (user: Omit<User, "id">) => {
        return userRepository
            .save(user)
            .then((res: User) => res)
            .catch(() => null);
    };
    return {
        persist,
    };
};

export default createUserRepository;
