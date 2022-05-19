import UnauthorizedError from "../../errors/unauthorized.error";
import { magicUseCase } from "./magic.use-case";

describe("magic admin controller", () => {
    it("Given a token function and a token, and the token doesn't have change password, returns true", () => {
        const accessToken: any = {
            verify: jest.fn(() => ({
                data: {},
            })),
        };
        const token = "";
        const response = magicUseCase({ accessToken })(token);
        expect(accessToken.verify).toHaveBeenCalledWith(token);
        expect(response).toBe(true);
    });
    it("Given a token function and a token, and the token does have change password, returns true", () => {
        const accessToken: any = {
            verify: jest.fn(() => ({
                data: { changePassword: true },
            })),
        };
        const token = "";
        const response = magicUseCase({ accessToken })(token);
        expect(accessToken.verify).toHaveBeenCalledWith(token);
        expect(response).toBe(false);
    });
    it("Given a token function and a token, and the token function throws error, a UnauthorizedError is thrown", () => {
        const accessToken: any = {
            verify: jest.fn(() => {
                throw new Error();
            }),
        };
        const token = "";
        try {
            const response = magicUseCase({ accessToken })(token);
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedError);
        }
        expect(accessToken.verify).toHaveBeenCalledWith(token);
    });
});
