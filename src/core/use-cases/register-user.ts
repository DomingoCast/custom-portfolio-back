import { User } from "../domain/user/User";
import UserRepository from "../ports/user-repository.port";

const registerUser = (
    user: Omit<User, "id">,
    userRepository: UserRepository
): Promise<User | null> => {
    return userRepository.persist(user);
};

export default registerUser;
