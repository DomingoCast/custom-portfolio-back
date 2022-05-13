import { Role } from "../../../core/domain/user/role.enum";
import validateUser from "../../../infrastructure/user/validate-user/validate-user";
import registerController from "./register.controller";

jest.mock("../../../infrastructure/user/validate-user/validate-user", () =>
    jest.fn()
);

const mockValidateUser = validateUser as unknown as jest.Mock;

describe("registerController", () => {
    const req: any = {
        body: null,
        container: {
            cradle: {
                logger: { error: jest.fn, info: jest.fn },
            },
        },
    };
    const res: any = {
        status: jest.fn(() => ({
            send: jest.fn,
        })),
    };
    const next = jest.fn;
    it("doesn't register null", () => {
        registerController(req, res, next);
        expect(mockValidateUser).toHaveBeenCalledTimes(1);
    });
    it("validates the input", () => {
        mockValidateUser.mockImplementation(jest.fn());
        registerController(req, res, next);
        expect(mockValidateUser).toHaveBeenCalledWith(req.body);
    });
    it("calls the usecase if the validation works", () => {
        const req: any = {
            body: null,
            container: {
                cradle: {
                    registerUserUseCase: jest.fn(async (x) => await x),
                    logger: { error: jest.fn, info: jest.fn },
                },
            },
        };
        mockValidateUser.mockImplementation(() => true);
        registerController(req, res, next);
        expect(req.container.cradle.registerUserUseCase).toHaveBeenCalledWith(
            req.body,
            Role.worker
        );
    });
});
