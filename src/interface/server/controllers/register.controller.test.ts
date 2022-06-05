import { Role } from "../../../core/domain/user/role.enum";
import InternalBadRequestError from "../../../core/errors/internal-bad-request-error";
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
    it("doesn't register null", async () => {
        mockValidateUser.mockImplementation(() => []);
        try {
            await registerController(req, res);
        } catch (e) {
            expect(e).toBeInstanceOf(InternalBadRequestError);
        }

        expect(mockValidateUser).toHaveBeenCalledWith(req.body);
    });
    it("calls the usecase if the validation works", async () => {
        mockValidateUser.mockImplementation(() => true);
        const req: any = {
            body: {},
            container: {
                cradle: {
                    registerUserUseCase: jest.fn(async (x) => await x),
                    logger: { error: jest.fn, info: jest.fn },
                },
            },
        };
        const res: any = {
            status: jest.fn(() => ({
                send: jest.fn,
            })),
        };
        await registerController(req, res);
        expect(req.container.cradle.registerUserUseCase).toHaveBeenCalledWith(
            req.body,
            Role.worker
        );
    });
});
