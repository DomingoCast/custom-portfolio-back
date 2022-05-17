import { LoginInfo } from "../domain/user/login-info";

interface AccessToken {
    create(loginInfo: Omit<LoginInfo, "password">): string;
    verify(token: string): string | unknown;
}

export default AccessToken;
