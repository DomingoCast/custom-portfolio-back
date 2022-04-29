import accessTokenFunction from "./access-token-function";

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessTokenFunction).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const accessToken =
            accessTokenFunction().createAccessToken("hola@gmail.com");
        expect(accessToken).toBeDefined();
    });
    it("Check the function verifyAccessToken", () => {
        const accessToken =
            accessTokenFunction().verifyAccessToken("hola@gmail.com");
        expect(accessToken).toBeDefined();
    });
});
