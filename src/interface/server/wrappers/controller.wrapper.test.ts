import CustomError from "../../../core/errors/custom-error";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";
import { controllerWrapper } from "./controller.wrapper";

jest.mock("../../../infrastructure/http-errors/http-error-handler", () =>
    jest.fn()
);

const mockHttpHandlerError = httpHandlerError as unknown as jest.Mock;
describe("controller wrapper", () => {
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
    const next: any = jest.fn();
    mockHttpHandlerError.mockImplementation(jest.fn());
    it("calls handler error if controller throws CustomError", () => {
        mockHttpHandlerError.mockReset();
        const controller: any = () => {
            throw new CustomError();
        };
        controllerWrapper(controller)(req, res, next);
        expect(mockHttpHandlerError).toHaveBeenCalled();
    });
    it("calls next if controller doesn't throw an error instance of CustomError", () => {
        mockHttpHandlerError.mockReset();
        mockHttpHandlerError.mockImplementation(jest.fn());
        const controller: any = () => {
            return "";
        };
        controllerWrapper(controller)(req, res, next);
        expect(mockHttpHandlerError).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});
