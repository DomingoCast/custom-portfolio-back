import { User } from "../../domain/user/User";
import UserRepository from "../../ports/user-repository.port";

type RegisterUserUseCaseProps = {
    userRepository: UserRepository;
};
type RegisterUserUseCase = (user: Omit<User, "id">) => Promise<User | null>;

const registerUserUseCase =
    ({ userRepository }: RegisterUserUseCaseProps): RegisterUserUseCase =>
    (user: Omit<User, "id">): Promise<User | null> => {
        return userRepository.persist(user);
    };

export default registerUserUseCase;
