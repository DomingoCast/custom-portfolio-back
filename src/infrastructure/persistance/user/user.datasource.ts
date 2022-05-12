import UserRepository from "../../../core/ports/user-repository.port";
import { User } from "../../../core/domain/user/user";
import UserModel from "./user.model";
import { dataSource } from "../datasource";

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
    const updatePassword = async (
        id: string,
        password: string
    ): Promise<User | null> => {
        const response = await userRepository.save({
            id,
            password,
        });
        return response;
    };
    return {
        persist,
        findByEmail,
        updatePassword,
    };
};

export default createUserRepository;
