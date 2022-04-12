import UserRepository from "../../../core/ports/user-repository.port";
import { User } from "../../../core/domain/user/User";
import UserModel from "./user.model";
import { DataSource } from "typeorm";

type CreateUserRepositoryProps = {
    dataSource: DataSource;
};

const createUserRepository = ({
    dataSource,
}: CreateUserRepositoryProps): UserRepository => {
    const userRepository = dataSource.getRepository(UserModel);
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
