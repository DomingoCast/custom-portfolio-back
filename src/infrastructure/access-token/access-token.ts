import jwtToken from "./jwt";
import { VerifyResponse } from "./verify.type";

const accessToken = () => {
    const create = (userLogin: object): string => {
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
