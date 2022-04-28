import validateUserDataForm from "../../../infrastructure/user/validate-user/validate-user-data-form";
import registerController from "./register.controller";

jest.mock(
    "../../../infrastructure/user/validate-user/validate-user-data-form",
    () => jest.fn()
);

const mockValidateUserDataForm = validateUserDataForm as unknown as jest.Mock;

describe("registerController", () => {
    const req: any = {
        body: null,
    };
    const res: any = {
        status: jest.fn((x) => ({
            send: jest.fn,
        })),
    };
    it("doesn't register null", () => {
        registerController(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
    it("validates the input", () => {
        mockValidateUserDataForm.mockImplementation(jest.fn());
        registerController(req, res);
        expect(mockValidateUserDataForm).toHaveBeenCalledWith(req.body);
    });
    it("calls the usecase if the validation works", () => {
        const req: any = {
            body: null,
            container: {
                cradle: { registerUserUseCase: jest.fn(async (x) => await x) },
            },
        };
        mockValidateUserDataForm.mockImplementation(() => true);
        registerController(req, res);
        expect(req.container.cradle.registerUserUseCase).toHaveBeenCalledWith(
            req.body
        );
    });
});
