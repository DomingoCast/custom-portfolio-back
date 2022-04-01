import { User } from "../domain/user/User";
import UserRepository from "../ports/user-repository.port";

const registerUser = (user: User, userRepository: UserRepository): void => {
    userRepository.persist(user);
};

export default registerUser;
