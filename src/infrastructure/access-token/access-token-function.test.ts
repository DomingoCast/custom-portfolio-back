import accessTokenFunction from "./access-token-function";

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessTokenFunction).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const accessToken = accessTokenFunction().createAccessToken();
        expect(accessToken).toBe(accessToken);
    });
    it("Check the function verifyAccessToken", () => {
        const createAccessToken = accessTokenFunction().createAccessToken();
        const accessToken =
            accessTokenFunction().verifyAccessToken(createAccessToken);
        expect(accessToken).toMatchObject({});
    });
});
