import CustomError from "../../../infrastructure/errors/custom-error";
import { LoginInfo } from "../../domain/user/login-info";
import UserRepository from "../../ports/user-repository.port";
type LoginUseCase = (loginInfo: LoginInfo) => void;

type LoginUseCaseProps = {
    userRepository: UserRepository;
};
const loginUseCase =
    ({ userRepository }: LoginUseCaseProps): LoginUseCase =>
    async (loginInfo: LoginInfo): Promise<void> => {
        if (!(await userRepository.findByEmail(loginInfo.email)))
            throw new CustomError("Email not in database");
    };

export default loginUseCase;
