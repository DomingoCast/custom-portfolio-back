import { User } from "../../domain/user/User";
import UserRepository from "../../ports/user-repository.port";
type RegisterUserProps = {
    userRepository: UserRepository;
};
const registerUser =
    ({
        userRepository,
    }: RegisterUserProps): ((user: Omit<User, "id">) => Promise<User | null>) =>
    (user: Omit<User, "id">): Promise<User | null> => {
        return userRepository.persist(user);
    };

export default registerUser;
