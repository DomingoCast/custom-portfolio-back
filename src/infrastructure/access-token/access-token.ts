import jwtToken from "./jwt";

const accessToken = () => {
    const createAccessToken = () => {
        return jwtToken().createAcessToken();
    };
    const verifyAccessToken = (token: string) => {
        return jwtToken().verifyAccessToken(token);
    };
    return {
        createAccessToken,
        verifyAccessToken,
    };
};
export default accessToken;
