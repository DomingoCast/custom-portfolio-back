import loginController from "./login.controller";

describe("loginController", () => {
    it("returns the response of the loginUseCase given a container", async () => {
        const req: any = {
            body: null,
            container: {
                cradle: {
                    loginUseCase: jest.fn((x) => x),
                    logger: { error: jest.fn, info: jest.fn },
                },
            },
        };
        const next = jest.fn;
        const sendResponse = jest.fn();
        const res: any = {
            status: jest.fn((x) => ({
                send: sendResponse,
            })),
        };
        const response = await loginController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(sendResponse).toHaveBeenCalledWith({ message: req.body });
    });
});
