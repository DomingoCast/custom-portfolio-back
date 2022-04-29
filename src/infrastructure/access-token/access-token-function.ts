import jwtToken from "./jwt";

const accessTokenFunction = () => {
    const createAccessToken = (value: string) => {
        return jwtToken().createAcessToken(value);
    };
    const verifyAccessToken = (value: string) => {
        return jwtToken().verifyAccessToken(createAccessToken(value), value);
    };
    return {
        createAccessToken,
        verifyAccessToken,
    };
};
export default accessTokenFunction;
