import NotFoundRequestError from "../not-found-request-error";

describe("NotFoundRequestError test", () => {
    it("Check if Not found Request is called", () => {
        const t = () => {
            throw new NotFoundRequestError("Not found Request");
        };
        expect(t).toThrowError(NotFoundRequestError);
        expect(t).toThrowError("Not found Request");
        expect(t).toBeTruthy();
    });
});
