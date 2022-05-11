import NotFoundError from "./not-found-error";

describe("NotFoundError test", () => {
    it("Check if error NotFound is called", () => {
        const notFound = new NotFoundError("Email not found");
        expect(notFound).toMatchObject({});
    });
    it("Should return the correct message", () => {
        const notFound = new NotFoundError("Email not found");
        expect(notFound.getCustomMessage()).toBe(
            "An error had occurred: Email not found"
        );
    });
    it("Check if NotFoundError work well", () => {
        const t = () => {
            throw new NotFoundError("Email not found");
        };
        expect(t).toThrowError(NotFoundError);
        expect(t).toThrow("Email not found");
        expect(t).toBeTruthy();
    });
    it("Check NotFoundError message work well", () => {
        const message = () => {
            throw new NotFoundError("Email not found").getCustomMessage();
        };
        expect(message).toBeTruthy();
        expect(message).toThrowError("An error had occurred: Email not found");
    });
});
