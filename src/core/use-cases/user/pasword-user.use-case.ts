import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import EmailSender from "../../ports/email/send-email.port";
import ConflictError from "../../errors/conflict-error";

type PasswordUserUseCaseProps = {
    userRepository: UserRepository;
    emailSender: EmailSender;
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
        if (!(await userRepository.findById(id)))
            throw new ConflictError("user doesn't exist");

        const userResponse = await userRepository.updatePassword(
            id,
            await hashFunction.hash(password)
        );
        return userResponse;
    };

export default passwordUserUseCase;
