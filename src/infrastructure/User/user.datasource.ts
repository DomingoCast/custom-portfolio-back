import UserModel from "./user.model";
import { DataSource } from "typeorm";
import UserRepository from "../../core/ports/user-repository.port";
import { User } from "../../core/domain/user/User";

const createUserRepository = (dataSource: DataSource): UserRepository => {
    const userRepository = dataSource.getRepository(UserModel);
    const persist = (user: Omit<User, "id">) => {
        return userRepository
            .save(user)
            .then((res) => res)
            .catch((err) => console.error(err));
    };
    return {
        persist,
    };
};

export default createUserRepository;
