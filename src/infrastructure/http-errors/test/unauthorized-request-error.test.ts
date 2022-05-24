import UnauthorizedRequestError from "../unauthorized-request-error";
const error: Error = {
    name: "UnauthorizedRequestError",
    message: "Unauthorized Request",
    stack: "Error: Unauthorized request\n",
};
describe("BadRequestError test", () => {
    it("Check if Bad Request is called", () => {
        const t = () => {
            throw new UnauthorizedRequestError(error);
        };
        expect(t).toThrowError(UnauthorizedRequestError);
        expect(t).toThrowError("Unauthorized Request");
        expect(t).toThrowError(error);
        expect(t).toBeTruthy();
    });
});
