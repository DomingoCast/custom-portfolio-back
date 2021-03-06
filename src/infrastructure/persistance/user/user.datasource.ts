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
    const findById = async (id: string): Promise<User | null> => {
        const response = await userRepository.findOneBy({
            id: id,
        });
        return response;
    };
    const findByEmail = async (email: string): Promise<User | null> => {
        const response = await userRepository.findOne({
            where: { email: email },
        });
        return response;
    };
    const update = async (user: User): Promise<User | null> => {
        const response = await userRepository.save({
            ...user,
        });
        return response;
    };
    return {
        persist,
        findByEmail,
        findById,
        update,
    };
};

export default createUserRepository;
