import { LoginInfo } from "../../domain/user/login-info";
import { User } from "../../domain/user/user";
type RegisterUserUseCase = (loginInfo: LoginInfo) => Promise<User | null>;

const loginUseCase =
    (): RegisterUserUseCase => async (): Promise<User | null> => {
        return null;
    };

export default loginUseCase;
