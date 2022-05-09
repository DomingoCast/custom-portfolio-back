import Email from "../../ports/email/email";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import EmailSender from "../../ports/email/send-email.port";
import CustomError from "../../../infrastructure/errors/custom-error";

type RegisterUserUseCaseProps = {
    userRepository: UserRepository;
    emailSender: EmailSender;
    hashFunction: HashFunction;
};
type RegisterUserUseCase = (user: Omit<User, "id">) => Promise<User | null>;

const registerUserUseCase =
    ({
        userRepository,
        hashFunction,
        emailSender,
    }: RegisterUserUseCaseProps): RegisterUserUseCase =>
    async (user: Omit<User, "id">): Promise<User | null> => {
        const userSafe = {
            ...user,
            password: await hashFunction.hash(user.password),
        };

        if (await userRepository.findByEmail(user.email))
            throw new CustomError("Email already in the database");

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
