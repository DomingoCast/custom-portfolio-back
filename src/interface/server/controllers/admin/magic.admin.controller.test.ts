import magicAdminController from "./magic.admin.controller";

describe("magic admin controller", () => {
    it("responds with status 200 when decoded token is false", () => {
        const container = {
            cradle: {
                accessToken: {
                    verify: jest.fn(() => ({
                        data: { changePassword: false },
                    })),
                },
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
    it("returns error given a token whick contains changePassword", () => {
        const container = {
            cradle: {
                accessToken: {
                    verify: jest.fn(() => ({ data: { changePassword: true } })),
                },
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
        expect(res.status).toHaveBeenCalledWith(400);
    });
});
