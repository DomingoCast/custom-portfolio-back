import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import ConflictError from "../../errors/conflict-error";

type PasswordUserUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
type PasswordUserUseCase = (
    id: string,
    password: string
) => Promise<User | null>;

const passwordUserUseCase =
    ({
        userRepository,
        hashFunction,
    }: PasswordUserUseCaseProps): PasswordUserUseCase =>
    async (id: string, password: string): Promise<User | null> => {
        const user = await userRepository.findById(id);
        if (!user) throw new ConflictError("user doesn't exist");

        const userResponse = await userRepository.update({
            ...user,
            password: await hashFunction.hash(password),
        });
        return userResponse;
    };

export default passwordUserUseCase;
