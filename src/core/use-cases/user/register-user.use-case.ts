import Email from "../../domain/email/Email";
import { User } from "../../domain/user/User";
import EmailSender from "../../ports/send-email.port";
import UserRepository from "../../ports/user-repository.port";

type RegisterUserUseCaseProps = {
    userRepository: UserRepository;
    emailSender: EmailSender;
};
type RegisterUserUseCase = (user: Omit<User, "id">) => Promise<User | null>;

const registerUserUseCase =
    ({
        userRepository,
        emailSender,
    }: RegisterUserUseCaseProps): RegisterUserUseCase =>
    async (user: Omit<User, "id">): Promise<User | null> => {
        const userResponse = await userRepository.persist(user);
        // if (userResponse) {
        const email: Email = {
            receiver: user.email,
            subject: "REGISTER",
            text: "register",
        };
        emailSender.send(email);
        // }
        return userResponse;
    };

export default registerUserUseCase;
