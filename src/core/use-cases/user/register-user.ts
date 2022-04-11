import { User } from "../../domain/user/User";
import UserRepository from "../../ports/user-repository.port";

const registerUser =
    ({ userRepository }: { userRepository: UserRepository }) =>
    (user: Omit<User, "id">): Promise<User | null> => {
        return userRepository.persist(user);
    };

export default registerUser;
