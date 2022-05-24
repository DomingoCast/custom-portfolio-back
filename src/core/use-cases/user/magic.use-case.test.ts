import { LoginInfo } from "../../domain/user/login-info";
import UnauthorizedError from "../../errors/unauthorized.error";
import AccessToken from "../../ports/access-token.port";
import { magicUseCase } from "./magic.use-case";

describe("magic admin controller", () => {
    it("Given a token function and a token, and the token doesn't have change password, returns true", () => {
        const accessToken: AccessToken = {
            verify: jest.fn(() => ({
                data: {},
            })),
            create: (loginInfo: Omit<LoginInfo, "password">) => loginInfo.email,
        };
        const token = "";
        const response = magicUseCase({ accessToken })(token);
        expect(accessToken.verify).toHaveBeenCalledWith(token);
        expect(response).toBe(true);
    });
    it("Given a token function and a token, and the token does have change password, returns true", () => {
        const accessToken: AccessToken = {
            verify: jest.fn(() => ({
                data: { changePassword: true },
            })),
            create: (loginInfo: Omit<LoginInfo, "password">) => loginInfo.email,
        };
        const token = "";
        const response = magicUseCase({ accessToken })(token);
        expect(accessToken.verify).toHaveBeenCalledWith(token);
        expect(response).toBe(false);
    });
    it("Given a token function and a token, and the token function throws error, a UnauthorizedError is thrown", () => {
        const accessToken: AccessToken = {
            verify: jest.fn(() => {
                throw new Error();
            }),
            create: (loginInfo: Omit<LoginInfo, "password">) => loginInfo.email,
        };
        const token = "";
        try {
            magicUseCase({ accessToken })(token);
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }
        expect(accessToken.verify).toHaveBeenCalledWith(token);
    });
});
