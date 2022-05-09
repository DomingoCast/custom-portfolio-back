import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
import HashFunction from "../../ports/hash-function.port";
import UserRepository from "../../ports/user-repository.port";
import ConflictErrorRequest from "../../../infrastructure/http-errors/conflict";
import NotFoundRequest from "../../../infrastructure/http-errors/not-found";
type LoginUseCaseProps = {
    userRepository: UserRepository;
    hashFunction: HashFunction;
};
type LoginUseCase = (loginInfo: LoginInfo) => void;
const loginUseCase =
    ({ userRepository, hashFunction }: LoginUseCaseProps): LoginUseCase =>
    async (loginInfo: LoginInfo): Promise<User | void> => {
        const user = await userRepository.findByEmail(loginInfo.email);
        if (!user) throw new NotFoundRequest("Email or password incorrect");
        if (!(await hashFunction.verify(user.password, loginInfo.password)))
            throw new ConflictErrorRequest("Email or password incorrect");
        return user;
    };

export default loginUseCase;
