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
    const findEmail = async (email: string): Promise<boolean> => {
        const response = await userRepository.find({
            where: { email: email },
        });
        console.log("[RESPONSE]", response);
        if (response.length > 0) return true;
        return false;
    };
    return {
        persist,
        findEmail,
    };
};

export default createUserRepository;
