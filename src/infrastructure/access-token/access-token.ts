import { LoginInfo } from "../../core/domain/user/login-info";
import AccessToken from "../../core/ports/access-token.port";
import jwtToken from "./jwt";
import { VerifyResponse, AccessTokenResponse } from "./verify.type";

const accessToken = (): AccessToken => {
    const create = (
        userLogin: Omit<LoginInfo, "password">
    ): AccessTokenResponse => {
        return jwtToken().createToken(userLogin);
    };
    const verify = (token: string): VerifyResponse => {
        return jwtToken().verifyToken(token);
    };
    return {
        create,
        verify,
    };
};
export default accessToken;
