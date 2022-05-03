import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
type LoginUseCase = (loginInfo: LoginInfo) => Promise<User | null>;

const loginUseCase =
    (loginInfo: LoginInfo): LoginUseCase =>
    async (): Promise<User | null> => {
        return null;
    };

export default loginUseCase;
