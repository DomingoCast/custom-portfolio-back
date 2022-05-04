import UserRepository from "../../../core/ports/user-repository.port";
import { User } from "../../../core/domain/user/user";
import UserModel from "./user.model";
import { dataSource } from "../postgres.datasources";

const createUserRepository = (): UserRepository => {
    const userRepository = dataSource.getRepository(UserModel);
    const persist = (user: Omit<User, "id">) => {
        return userRepository
            .save(user)
            .then((res: User) => res)
            .catch(() => null);
    };
    const findByEmail = async (email: string): Promise<User | null> => {
        const response = await userRepository.findOne({
            where: { email: email },
        });
        return response;
    };
    return {
        persist,
        findByEmail,
    };
};

export default createUserRepository;
