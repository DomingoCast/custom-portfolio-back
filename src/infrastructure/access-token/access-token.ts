import jwtToken from "./jwt";

const accessToken = () => {
    const create = () => {
        return jwtToken().createToken();
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
