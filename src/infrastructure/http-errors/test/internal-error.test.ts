import InternalServerError from "../internal-error";

describe("InternalError test", () => {
    it("Check if Internal Server Error is called", () => {
        const t = () => {
            throw new InternalServerError("Internal Server Error");
        };
        expect(t).toThrowError(InternalServerError);
        expect(t).toThrowError("Internal Server Error");
        expect(t).toBeTruthy();
    });
});
