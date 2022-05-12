import CustomError from "../custom-error";

describe("CustomError test", () => {
    it("Check if function getCustomMessage is called", () => {
        const customError = new CustomError("error");
        expect(customError).toMatchObject({});
    });
    it("Should return the correct message", () => {
        const customError = new CustomError("error");
        expect(customError.getCustomMessage()).toBe(
            "An error had occurred: error"
        );
    });
    it("Check if custom Error work well", () => {
        const t = () => {
            throw new CustomError("Register Error");
        };

        expect(t).toThrowError(CustomError);
        expect(t).toThrow("Register Error");
        expect(t).toBeTruthy();
    });
    it("Check custom message work well", () => {
        const message = () => {
            throw new CustomError("Register Error").getCustomMessage();
        };
        expect(message).toBeTruthy();
        expect(message).toThrowError("An error had occurred: Register Error");
    });
});
