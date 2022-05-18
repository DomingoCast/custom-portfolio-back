import { LoginInfo } from "../../core/domain/user/login-info";
import accessToken from "./access-token";
import { VerifyResponse } from "./verify.type";
const userLogin: Omit<LoginInfo, "password"> = {
    email: "test@gmail.com",
};
const createAccessToken: string = accessToken().create(userLogin);
const isValidAccessToken: VerifyResponse = accessToken().verify(
    createAccessToken
) as VerifyResponse;

describe("Test for access Token", () => {
    it("Check the function accessTokenFunction", () => {
        expect(accessToken).toBeDefined();
    });
    it("Check the function createAccessToken", () => {
        expect(createAccessToken).toContain("");
    });
    it("Check the function verifyAccessToken", () => {
        expect(isValidAccessToken).toMatchObject({});
    });
});
