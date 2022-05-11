import ConflictRequestError from "../conflict-request-error";

describe("ConflictRequestError test", () => {
    it("Check if Conflict Request is called", () => {
        const t = () => {
            throw new ConflictRequestError("Conflict Request");
        };
        expect(t).toThrowError(ConflictRequestError);
        expect(t).toThrowError("Conflict Request");
        expect(t).toBeTruthy();
    });
});
