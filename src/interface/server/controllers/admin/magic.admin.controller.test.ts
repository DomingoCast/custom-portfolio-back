import magicAdminController from "./magic.admin.controller";

describe("magic admin controller", () => {
    it("responds with status 200 when decoded magicUseCase returns true", () => {
        const container = {
            cradle: {
                accessToken: {
                    verify: jest.fn(() => ({
                        data: { changePassword: true },
                    })),
                },
                magicUseCase: jest.fn(() => true),
            },
        };
        const req: any = { query: { token: "" }, container };
        const res: any = {
            status: jest.fn((x) => ({
                send: jest.fn,
            })),
        };
        const next = jest.fn;
        magicAdminController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
    });
    it("responds with status 401 when decoded magicUseCase returns false", () => {
        const container = {
            cradle: {
                accessToken: {
                    verify: jest.fn(() => ({
                        data: { changePassword: false },
                    })),
                },
                magicUseCase: jest.fn(() => false),
            },
        };
        const req: any = { query: { token: "" }, container };
        const res: any = {
            status: jest.fn((x) => ({
                send: jest.fn,
            })),
        };
        const next = jest.fn;
        magicAdminController(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});
