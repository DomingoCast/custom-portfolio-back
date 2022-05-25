import { LoginInfo } from "../../core/domain/user/login-info";
import AccessToken from "../../core/ports/access-token.port";
import jwtToken from "./jwt";
import { VerifyResponse, AccessTokenResponse } from "./verify.type";
import CustomError from "../../core/errors/custom-error";

const accessToken = (): AccessToken => {
    const create = (
        userLogin: Omit<LoginInfo, "password">
    ): AccessTokenResponse => {
        try {
            return jwtToken().createToken(userLogin);
        } catch (error: unknown) {
            if (error instanceof CustomError)
                throw new CustomError(error.message);
            if (!(error instanceof CustomError))
                throw new CustomError("Error creating token");
        }
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
