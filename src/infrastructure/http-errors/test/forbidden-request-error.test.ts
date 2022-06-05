import ForbiddenRequestError from "../forbidden-request-error";
const error: Error = {
    name: "ForbiddenRequestError",
    message: "Forbidden Request",
    stack: "Error: Forbidden request\n",
};
describe("NotFoundRequestError test", () => {
    it("Check if Not found Request is called", () => {
        const t = () => {
            throw new ForbiddenRequestError(error);
        };
        expect(t).toThrowError(ForbiddenRequestError);
        expect(t).toThrowError("Forbidden Request");
        expect(t).toThrowError(error);
        expect(t).toBeTruthy();
    });
});
