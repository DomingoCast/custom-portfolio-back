import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import ConflictError from "../../errors/conflict-error";
type LoginUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
type LoginUseCase = (loginInfo: LoginInfo) => void;
const loginUseCase =
    ({ userRepository, hashFunction }: LoginUseCaseProps): LoginUseCase =>
    async (loginInfo: LoginInfo): Promise<User | void> => {
        const user = await userRepository.findByEmail(loginInfo.email);
        if (!user) throw new NotFoundError("Email not found");
        if (!(await hashFunction.verify(user.password, loginInfo.password)))
            throw new ConflictError("Email or password incorrect");
        return user;
    };

export default loginUseCase;
