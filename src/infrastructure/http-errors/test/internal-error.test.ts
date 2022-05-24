import InternalServerError from "../internal-error";
const error: Error = {
    name: "InternalServerError",
    message: "Internal Server Error",
    stack: "Error: Internal server error\n",
};
describe("InternalError test", () => {
    it("Check if Internal Server Error is called", () => {
        const t = () => {
            throw new InternalServerError(error);
        };
        expect(t).toThrowError(InternalServerError);
        expect(t).toThrowError("Internal Server Error");
        expect(t).toThrowError(error);
        expect(t).toBeTruthy();
    });
});
