import Email from "../../ports/email/email";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import EmailSender from "../../ports/email/send-email.port";
import { RegisterInfo } from "../../domain/user/register-info";
import { Role } from "../../domain/user/role.enum";
import ConflictError from "../../errors/conflict-error";

type RegisterUserUseCaseProps = {
    userRepository: UserRepository;
    emailSender: EmailSender;
    hashFunction: HashFunction;
};
type RegisterUserUseCase = (user: RegisterInfo) => Promise<User | null>;

const registerUserUseCase =
    ({
        userRepository,
        hashFunction,
        emailSender,
    }: RegisterUserUseCaseProps): RegisterUserUseCase =>
    async (user: RegisterInfo, role = Role.worker): Promise<User | null> => {
        const userSafe = {
            ...user,
            password: await hashFunction.hash(user.password),
            role,
        };

        if (await userRepository.findByEmail(user.email))
            throw new ConflictError("Email already in the database");

        const userResponse = await userRepository.persist(userSafe);
        if (userResponse) {
            const email: Email = {
                receiver: user.email,
                subject: "REGISTER",
                template: "register",
            };
            emailSender.send(email);
        }
        return userResponse;
    };

export default registerUserUseCase;
