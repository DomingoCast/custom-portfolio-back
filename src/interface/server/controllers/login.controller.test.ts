import loginController from "./login.controller";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";

jest.mock("../../../infrastructure/user/validate-login/validate-login", () =>
    jest.fn()
);

const mockValidateLogin = validateLogin as unknown as jest.Mock;

describe("loginController", () => {
    it("returns the response of the loginUseCase given a container", () => {
        mockValidateLogin.mockImplementation(jest.fn(() => true));
        const req: any = {
            body: null,
            container: {
                cradle: {
                    loginUseCase: jest.fn((x) => x),
                    logger: { error: jest.fn() },
                },
            },
        };
        const sendResponse = jest.fn();
        const res: any = {
            status: jest.fn((x) => ({
                send: sendResponse,
            })),
        };
        loginController(req, res);
        expect(mockValidateLogin).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(sendResponse).toHaveBeenCalledWith({ message: req.body });
    });
});
