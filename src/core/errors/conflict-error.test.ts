import ConflictError from "./conflict-error";

describe("ConflictError test", () => {
    it("Check if ConflictError is called", () => {
        const conflictError = new ConflictError("Email or password incorrect");
        expect(conflictError).toMatchObject({});
    });
    it("Should return the correct message", () => {
        const conflictError = new ConflictError("Email or password incorrect");
        expect(conflictError.getCustomMessage()).toBe(
            "An error had occurred: Email or password incorrect"
        );
    });
    it("Check if ConflictError work well", () => {
        const t = () => {
            throw new ConflictError("Email or password incorrect");
        };
        expect(t).toThrowError(ConflictError);
        expect(t).toThrow("Email or password incorrect");
        expect(t).toBeTruthy();
    });
    it("Check ConflictError message work well", () => {
        const message = () => {
            throw new ConflictError(
                "Email or password incorrect"
            ).getCustomMessage();
        };
        expect(message).toBeTruthy();
        expect(message).toThrowError("Email or password incorrect");
    });
});
