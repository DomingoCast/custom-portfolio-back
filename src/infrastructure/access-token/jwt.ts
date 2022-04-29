import jwt from "jsonwebtoken";

const jwtToken = () => {
    const createAcessToken = (value: string) => {
        return jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 60 * 60 },
            value
        );
    };
    const verifyAccessToken = (token: string, value: string) => {
        const decoded = jwt.verify(token, value);
        return decoded;
    };
    return {
        createAcessToken,
        verifyAccessToken,
    };
};

export default jwtToken;
