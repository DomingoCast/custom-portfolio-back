import UserModel from "./user.model";
import { DataSource } from "typeorm";
import UserRepository from "../../core/ports/user-repository.port";
import { User } from "../../core/domain/user/User";

const createUserRepository = (dataSource: DataSource): UserRepository => {
    const userRepository = dataSource.getRepository(UserModel);
    const persist = (user: User) => {
        return userRepository
            .save(user)
            .then(() => console.log("GUARDADO"))
            .catch((err) => console.error(err));
    };
    return {
        persist,
    };
};

export default createUserRepository;
