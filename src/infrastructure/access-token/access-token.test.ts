import accessToken from "./access-token";

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessToken).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const createAccessToken = accessToken().createAccessToken();
        expect(createAccessToken).toBe(accessToken);
    });
    it("Check the function verifyAccessToken", () => {
        const createAccessToken = accessToken().createAccessToken();
        const verifyAccessToken =
            accessToken().verifyAccessToken(createAccessToken);
        expect(verifyAccessToken).toMatchObject({});
    });
});
