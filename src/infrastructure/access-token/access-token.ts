import { LoginInfo } from "../../core/domain/user/login-info";
import jwtToken from "./jwt";
import { VerifyResponse } from "./verify.type";

const accessToken = () => {
    const create = (userLogin: Omit<LoginInfo, "password">): string => {
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
