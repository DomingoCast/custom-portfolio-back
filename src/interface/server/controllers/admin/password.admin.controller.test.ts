import validatePassword from "../../../../infrastructure/user/validate-password/validate-password";
import passwordAdminController from "./password.admin.controller";

jest.mock(
    "../../../../infrastructure/user/validate-password/validate-password",
    () => jest.fn(() => true)
);

const mockValidatePassword = validatePassword as unknown as jest.Mock;

describe("password admin controller", () => {
    it("responds with status 200 when passwordUseCase returns", async () => {
        const container = {
            cradle: {
                accessToken: {
                    verify: jest.fn(() => ({
                        data: { id: true },
                    })),
                    create: jest.fn(),
                },
                passwordUserUseCase: jest.fn(async () => await true),
                logger: { info: jest.fn() },
            },
        };
        const req: any = {
            body: { password: "12345678" },
            headers: { token: true },
            container,
        };
        const res: any = {
            status: jest.fn((x) => ({
                send: jest.fn,
            })),
        };
        const next = jest.fn;
        await passwordAdminController(req, res, next);
        expect(mockValidatePassword).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
