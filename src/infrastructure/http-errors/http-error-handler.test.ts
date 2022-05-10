import httpHandlerError from "./http-error-handler";
import NextFunction from "express";
import NotFoundError from "../../core/errors/not-found-error";
const error = new Error("test");
describe("Http error handler test", () => {
    it("Check if httpHandlerError is called", () => {
        const httpError = httpHandlerError(error, NextFunction);
        expect(httpError).toMatchObject({});
    });
    it("Check if Http Error work well", () => {
        const prueba = () => {
            try {
                throw new NotFoundError("Register Error");
            } catch (error) {
                httpHandlerError(error, NextFunction);
            }
        };
        debugger;
        expect(prueba).toThrowError(NotFoundError);
    });
});
