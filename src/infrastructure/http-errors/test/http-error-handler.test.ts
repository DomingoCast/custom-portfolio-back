import NotFoundError from "../../../core/errors/not-found-error";
import httpHandlerError from "../http-error-handler";
import NextFunction from "express";

describe("Http error handler test", () => {
    it.skip("Check if httpHandlerError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new NotFoundError("Email not found");
            } catch (error) {
                httpHandlerError(error, NextFunction);
            }
        };
        expect(testHttpHandler).toBeCalled();
    });
});
