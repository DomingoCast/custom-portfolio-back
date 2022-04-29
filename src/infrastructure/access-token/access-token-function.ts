const accessTokenFunction = () => {
    const createAccessToken = () => {
        return "Hello";
    };
    const verifyAccessToken = () => {
        return "Ok";
    };
    return {
        createAccessToken,
        verifyAccessToken,
    };
};
export default accessTokenFunction;
