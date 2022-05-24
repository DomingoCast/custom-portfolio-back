import NotFoundRequestError from "../not-found-request-error";
const error: Error = {
    name: "NotFoundRequestError",
    message: "Not Found",
    stack: "Error: Not found\n",
};
describe("NotFoundRequestError test", () => {
    it("Check if Not found Request is called", () => {
        const t = () => {
            throw new NotFoundRequestError(error);
        };
        expect(t).toThrowError(NotFoundRequestError);
        expect(t).toThrowError("Not Found");
        expect(t).toThrowError(error);
        expect(t).toBeTruthy();
    });
});
