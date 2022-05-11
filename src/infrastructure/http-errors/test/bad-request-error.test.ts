import BadRequestError from "../bad-request-error";

describe("BadRequestError test", () => {
    it("Check if Bad Request is called", () => {
        const t = () => {
            throw new BadRequestError("Bad Request");
        };
        expect(t).toThrowError(BadRequestError);
        expect(t).toThrowError("Bad Request");
        expect(t).toBeTruthy();
    });
});
