import BadRequestError from "../bad-request-error";
const error: Error = {
    name: "BadRequestError",
    message: "Bad Request",
    stack: "Error: Bad request\n",
};
describe("BadRequestError test", () => {
    it("Check if Bad Request is called", () => {
        const t = () => {
            throw new BadRequestError(error);
        };
        expect(t).toThrowError(BadRequestError);
        expect(t).toThrowError("Bad Request");
        expect(t).toThrowError(error);
        expect(t).toBeTruthy();
    });
});
