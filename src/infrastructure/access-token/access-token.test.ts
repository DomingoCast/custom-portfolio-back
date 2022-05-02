import accessToken from "./access-token";

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessToken).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const createAccessToken: string = accessToken().createAccessToken();
        expect(createAccessToken).toContain("");
    });
    it("Check the function verifyAccessToken", () => {
        const createAccessToken = accessToken().createAccessToken();
        const verifyAccessToken =
            accessToken().verifyAccessToken(createAccessToken);
        expect(verifyAccessToken).toMatchObject({});
    });
});
