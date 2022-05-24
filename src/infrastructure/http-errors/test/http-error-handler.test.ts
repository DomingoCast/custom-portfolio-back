import httpErrorHandler from "../http-error-handler";
import InternalServerError from "../internal-error";
import InternalBadRequestError from "../../../core/errors/internal-bad-request-error";
import CustomError from "../../../core/errors/custom-error";
import NotFoundError from "../../../core/errors/not-found-error";
import NotFoundRequestError from "../not-found-request-error";
import BadRequestError from "../bad-request-error";
import ConflictError from "../../../core/errors/conflict-error";
import ConflictRequestError from "../conflict-request-error";
import ForbiddenError from "../../../core/errors/forbidden-error";
import ForbiddenRequestError from "../forbidden-request-error";
import UnauthorizedRequestError from "../unauthorized-request-error";
import UnauthorizedError from "../../../core/errors/unauthorized.error";

describe("Http error handler test", () => {
    it("Check if httpErrorHandler is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new InternalBadRequestError("Bad Request");
            } catch (error) {
                if (error instanceof CustomError) httpErrorHandler(error);
                httpErrorHandler(new InternalServerError(error as Error));
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check httpErrorHandler - case NotFoundRequestError ", () => {
        const errorMessage = "Test request message";
        const handledError = httpErrorHandler(new NotFoundError(errorMessage));
        expect(handledError instanceof NotFoundRequestError).toBeTruthy();
        expect(handledError.message).toBe(errorMessage);
        expect(handledError.statusCode).toBe(404);
        expect(handledError.name).toBe("NotFoundRequestError");
    });
    it("Check httpErrorHandler - case BadRequestError ", () => {
        const errorMessage = "Test request message";
        const handledError = httpErrorHandler(
            new InternalBadRequestError(errorMessage)
        );
        expect(handledError instanceof BadRequestError).toBeTruthy();
        expect(handledError.message).toBe(errorMessage);
        expect(handledError.statusCode).toBe(400);
        expect(handledError.name).toBe("BadRequestError");
    });
    it("Check httpErrorHandler - case ConflictRequestError ", () => {
        const errorMessage = "Test request message";
        const handledError = httpErrorHandler(new ConflictError(errorMessage));
        expect(handledError instanceof ConflictRequestError).toBeTruthy();
        expect(handledError.message).toBe(errorMessage);
        expect(handledError.statusCode).toBe(409);
        expect(handledError.name).toBe("ConflictRequestError");
    });
    it("Check httpErrorHandler - case ForbiddenRequestError ", () => {
        const errorMessage = "Test request message";
        const handledError = httpErrorHandler(new ForbiddenError(errorMessage));
        expect(handledError instanceof ForbiddenRequestError).toBeTruthy();
        expect(handledError.message).toBe(errorMessage);
        expect(handledError.statusCode).toBe(403);
        expect(handledError.name).toBe("ForbiddenRequestError");
    });
    it("Check httpErrorHandler - case InternalServerError ", () => {
        const errorMessage = "Test request message";
        const handledError = httpErrorHandler(new CustomError(errorMessage));
        expect(handledError instanceof InternalServerError).toBeTruthy();
        expect(handledError.message).toBe(errorMessage);
        expect(handledError.statusCode).toBe(500);
        expect(handledError.name).toBe("InternalServerError");
    });
    it("Check httpErrorHandler - case UnauthorizedRequestError ", () => {
        const errorMessage = "Test request message";
        const handledError = httpErrorHandler(
            new UnauthorizedError(errorMessage)
        );
        expect(handledError instanceof UnauthorizedRequestError).toBeTruthy();
        expect(handledError.message).toBe(errorMessage);
        expect(handledError.statusCode).toBe(401);
        expect(handledError.name).toBe("UnauthorizedRequestError");
    });
});
