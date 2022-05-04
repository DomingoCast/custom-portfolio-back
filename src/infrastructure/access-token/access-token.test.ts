import accessToken from "./access-token";
import { VerifyResponse } from "./verify.type";
const userLogin: object = {
    id: "1",
    email: "test@gmail.com",
};
const createAccessToken: string = accessToken().create(userLogin);
const verifyAccessToken: VerifyResponse =
    accessToken().verify(createAccessToken);

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessToken).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        expect(createAccessToken).toContain("");
    });
    it("Check the function verifyAccessToken", () => {
        expect(verifyAccessToken).toMatchObject({});
    });
});
