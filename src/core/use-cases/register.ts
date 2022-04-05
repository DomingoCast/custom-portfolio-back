import { User } from "../domain/user/User";
import UserRepository from "../ports/user-repository.port";

const registerUser = (
    user: Omit<User, "id">,
    userRepository: UserRepository
): Promise<void | Omit<User, "id">> => {
    return userRepository.persist(user);
};

export default registerUser;
