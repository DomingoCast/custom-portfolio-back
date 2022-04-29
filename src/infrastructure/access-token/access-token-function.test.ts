import accessTokenFunction from "./access-token-function";

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessTokenFunction).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const accessToken = accessTokenFunction().createAccessToken();
        expect(accessToken).toBe("Hello");
    });
    it("Check the function verifyAccessToken", () => {
        const accessToken = accessTokenFunction().verifyAccessToken();
        expect(accessToken).toBe("Ok");
    });
});
