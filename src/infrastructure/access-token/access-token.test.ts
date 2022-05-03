import accessToken from "./access-token";
const UserLogin = {
    id: "1",
    email: "test@gmail.com",
};
describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessToken).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        const createAccessToken = accessToken().create(UserLogin);
        expect(createAccessToken).toContain("");
    });
    it("Check the function verifyAccessToken", () => {
        const createAccessToken = accessToken().create(UserLogin);
        const verifyAccessToken = accessToken().verify(createAccessToken);
        expect(verifyAccessToken).toMatchObject({});
    });
});
