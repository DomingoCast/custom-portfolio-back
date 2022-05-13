import HttpError from "../http-error";
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
