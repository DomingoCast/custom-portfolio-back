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
        const response = await userRepository.find({
            where: { email: email },
        });
        if (response.length > 0) return response[0];
        return null;
    };
    return {
        persist,
        findByEmail,
    };
};

export default createUserRepository;
