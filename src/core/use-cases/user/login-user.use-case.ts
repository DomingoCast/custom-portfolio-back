import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import ForbiddenError from "../../errors/forbidden-error";
type LoginUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
type LoginUseCase = (loginInfo: LoginInfo) => void;
const loginUseCase =
    ({ userRepository, hashFunction }: LoginUseCaseProps): LoginUseCase =>
    async (loginInfo: LoginInfo): Promise<User | void> => {
        const user = await userRepository.findByEmail(loginInfo.email);
        if (!user)
            throw new ForbiddenError("You don't have permission to access");
        if (!(await hashFunction.verify(user.password, loginInfo.password)))
            throw new ForbiddenError("You don't have permission to access");
        return user;
    };

export default loginUseCase;
