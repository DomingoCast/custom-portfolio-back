import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import ForbiddenError from "../../errors/forbidden-error";
type LoginUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
const PERMISSION_DENIED = "You don't have permission to access";

type LoginUseCase = (loginInfo: LoginInfo) => void;
const loginUseCase =
    ({ userRepository, hashFunction }: LoginUseCaseProps): LoginUseCase =>
    async (loginInfo: LoginInfo): Promise<User | void> => {
        const user = await userRepository.findByEmail(loginInfo.email);
        if (!user) throw new ForbiddenError(PERMISSION_DENIED);
        const isIncorrectPassword = !(await hashFunction.verify(
            user.password,
            loginInfo.password
        ));
        if (isIncorrectPassword) throw new ForbiddenError(PERMISSION_DENIED);
        return user;
    };

export default loginUseCase;
