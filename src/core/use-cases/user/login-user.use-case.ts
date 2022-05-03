import CustomError from "../../../infrastructure/errors/custom-error";
import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
type LoginUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
type LoginUseCase = (loginInfo: LoginInfo) => void;
const loginUseCase =
    ({ userRepository, hashFunction }: LoginUseCaseProps): LoginUseCase =>
    async (loginInfo: LoginInfo): Promise<User | void> => {
        const user = await userRepository.findByEmail(loginInfo.email);
        if (!user) throw new CustomError("Email or password incorrect");
        if (await hashFunction.verify(user.password, loginInfo.password))
            throw new CustomError("Email or password incorrect");
        return user;
    };

export default loginUseCase;
