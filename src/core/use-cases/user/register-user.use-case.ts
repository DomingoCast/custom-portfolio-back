import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";

type RegisterUserUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
type RegisterUserUseCase = (user: Omit<User, "id">) => Promise<User | null>;

const registerUserUseCase =
    ({
        userRepository,
        hashFunction,
    }: RegisterUserUseCaseProps): RegisterUserUseCase =>
    async (user: Omit<User, "id">): Promise<User | null> => {
        const userSafe = {
            ...user,
            password: await hashFunction.hash(user.password),
        };

        return userRepository.persist(userSafe);
    };

export default registerUserUseCase;
