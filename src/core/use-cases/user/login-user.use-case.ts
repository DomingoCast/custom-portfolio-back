import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
// import HashFunction from "../../ports/hash-function.port";
// import UserRepository from "../../ports/user-repository.port";
// import EmailSender from "../../ports/email/send-email.port";

// type RegisterUserUseCaseProps = {
// userRepository: UserRepository;
// emailSender: EmailSender;
// hashFunction: HashFunction;
// };
type RegisterUserUseCase = (loginInfo: LoginInfo) => Promise<User | null>;

const loginUseCase =
    (): // {userRepository,
    // hashFunction,
    // emailSender,}
    // :RegisterUserUseCaseProps
    RegisterUserUseCase =>
    async (/* loginInfo: LoginInfo */): Promise<User | null> => {
        return null;
    };

export default loginUseCase;
