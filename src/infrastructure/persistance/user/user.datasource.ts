import UserRepository from "../../../core/ports/user-repository.port";
import { User } from "../../../core/domain/user/User";
import UserModel from "./user.model";
import { dataSource } from "../postgres.datasources";

<<<<<<< HEAD
type CreateUserRepositoryProps = {
    dataSource: DataSource;
};

const createUserRepository = ({
    dataSource,
}: CreateUserRepositoryProps): UserRepository => {
    console.log(dataSource);
=======
const createUserRepository = (): UserRepository => {
>>>>>>> f85484eaa41e9e708f4369c6928e82983b1d7b3a
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
