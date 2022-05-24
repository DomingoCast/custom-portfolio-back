import ConflictRequestError from "../conflict-request-error";

const error: Error = {
    name: "Conflict",
    message: "Conflict Request",
    stack: "Error: Conflict request\n",
};
describe("ConflictRequestError test", () => {
    it("Check if Conflict Request is called", () => {
        const t = () => {
            throw new ConflictRequestError(error);
        };
        expect(t).toThrowError(ConflictRequestError);
        expect(t).toThrowError("Conflict Request");
        expect(t).toThrowError(error);
        expect(t).toBeTruthy();
    });
});
