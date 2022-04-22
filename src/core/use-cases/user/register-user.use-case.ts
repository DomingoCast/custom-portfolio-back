import Email from "../../ports/email/email";
import { User } from "../../domain/user/User";

import UserRepository from "../../ports/user-repository.port";
import EmailSender from "../../ports/email/send-email.port";

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
