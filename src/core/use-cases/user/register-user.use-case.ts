import { User } from "../../domain/user/user";
import UserRepository from "../../ports/user-repository.port";

type RegisterUserUseCaseProps = {
    userRepository: UserRepository;
};
type RegisterUserUseCase = (user: Omit<User, "id">) => Promise<string | null>;

const registerUserUseCase =
    ({ userRepository }: RegisterUserUseCaseProps): RegisterUserUseCase =>
    async (user: Omit<User, "id">): Promise<string | null> => {
        const response = await userRepository.persist(user);
        if (response) return "user has been registered";
        return null;
    };

export default registerUserUseCase;
