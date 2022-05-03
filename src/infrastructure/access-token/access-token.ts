import jwtToken from "./jwt";

const accessToken = () => {
    const create = (UserLogin: any) => {
        return jwtToken().createToken(UserLogin);
    };
    const verify = (token: string) => {
        return jwtToken().verifyToken(token);
    };
    return {
        create,
        verify,
    };
};
export default accessToken;
