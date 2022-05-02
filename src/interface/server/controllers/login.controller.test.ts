import loginController from "./login.controller";

describe("loginController", () => {
    it("returns the response of the loginUseCase given a container", () => {
        const req: any = {
            body: null,
            container: {
                cradle: {
                    loginUseCase: jest.fn((x) => x),
                    logger: { error: jest.fn(), info: jest.fn() },
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
        expect(res.status).toHaveBeenCalledWith(200);
        expect(sendResponse).toHaveBeenCalledWith({ message: req.body });
    });
});
