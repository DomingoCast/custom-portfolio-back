import HttpError from "./error";
import BadRequestError from "./bad-request";
describe("Http error test", () => {
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
    });
});
