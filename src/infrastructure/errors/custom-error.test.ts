import CustomError from "./custom-error";

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
    it("Problem in register and return CustomError register", () => {
        const customError = new CustomError("Register problem");
        expect(customError.getCustomMessage()).toBe(
            "An error had occurred: Register problem"
        );
    });
});
