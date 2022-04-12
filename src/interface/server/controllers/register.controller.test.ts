import registerController from "./register.controller";

describe("registerController", () => {
    it("doesn't register null", () => {
        const req: any = {
            body: null,
        };
        const res: any = {
            status: jest.fn((x) => ({
                send: jest.fn,
            })),
        };
        const mockDs: any = "";
        registerController(req, mockDs, res);
        expect(res.status).toHaveBeenCalledWith(409);
    });

    it("doesn't register null", () => {
        const req: any = {
            body: null,
        };
        const res: any = {
            status: jest.fn((x) => ({
                send: jest.fn,
            })),
        };
        const mockDs: any = "";
        registerController(req, mockDs, res);
        expect(res.status).toHaveBeenCalledWith(409);
    });
});
