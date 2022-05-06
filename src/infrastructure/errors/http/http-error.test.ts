import HttpError from "./http-error";
import BadRequestError from "./http-bad-request";
describe("CustomError test", () => {
    it("Check if HttpError is called", () => {
        const customError = new HttpError("An error had occurred", 500);
        expect(customError).toMatchObject({});
    });
    it("Check if BadRequestError is called", () => {
        const customError = new BadRequestError("error");
        expect(customError).toMatchObject({});
    });
    it("Check if custom Error work well", () => {
        const t = () => {
            throw new BadRequestError("Register Error");
        };
        expect(t).toThrowError(BadRequestError);
        expect(t).toBeTruthy();
        expect(t).toThrowError("Register Error");
        // see status code 400
    });
});
