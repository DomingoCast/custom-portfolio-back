import accessToken from "./access-token";

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessToken).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const createAccessToken: string = accessToken().create();
        expect(createAccessToken).toContain("");
    });
    it("Check the function verifyAccessToken", () => {
        const createAccessToken = accessToken().create();
        const verifyAccessToken = accessToken().verify(createAccessToken);
        expect(verifyAccessToken).toMatchObject({});
    });
});
