import HttpError from "./http-error";
import BadRequestError from "./bad-request-error";
import ConflictRequestError from "./conflict-request-error";
import NotFoundRequestError from "./not-found-request-error";
import InternalServerError from "./internal-error";
describe("Http error test", () => {
    it("Check if HttpError is called", () => {
        const customError = new HttpError("An error had occurred", 500);
        expect(customError).toMatchObject({});
    });
    it("Check if Http Error work well", () => {
        const t = () => {
            throw new HttpError("Register Error", 500);
        };
        expect(t).toThrowError(HttpError);
        expect(t).toBeTruthy();
        expect(t).toThrowError("Register Error");
    });
});
describe("Check all functions of HttpError", () => {
    it("Check if Bad Request is called", () => {
        const t = () => {
            throw new BadRequestError("Bad Request");
        };
        expect(t).toThrowError(BadRequestError);
        expect(t).toThrowError("Bad Request");
        expect(t).toBeTruthy();
    });
    it("Check if Not found Request is called", () => {
        const t = () => {
            throw new NotFoundRequestError("Not found Request");
        };
        expect(t).toThrowError(NotFoundRequestError);
        expect(t).toThrowError("Not found Request");
        expect(t).toBeTruthy();
    });
    it("Check if Conflict Request is called", () => {
        const t = () => {
            throw new ConflictRequestError("Conflict Request");
        };
        expect(t).toThrowError(ConflictRequestError);
        expect(t).toThrowError("Conflict Request");
        expect(t).toBeTruthy();
    });
    it("Check if Internal Server Error is called", () => {
        const t = () => {
            throw new InternalServerError("Internal Server Error");
        };
        expect(t).toThrowError(InternalServerError);
        expect(t).toThrowError("Internal Server Error");
        expect(t).toBeTruthy();
    });
});
