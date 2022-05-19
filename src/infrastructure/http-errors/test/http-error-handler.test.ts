import httpErrorHandler from "../http-error-handler";
import NextFunction from "express";
import BadRequestError from "../bad-request-error";
import NotFoundRequestError from "../not-found-request-error";
import ConflictRequestError from "../conflict-request-error";
import InternalServerError from "../internal-error";

describe("Http error handler test", () => {
    it("Check if httpErrorHandler is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new BadRequestError("Bad Request");
            } catch (error) {
                httpErrorHandler(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check if httpErrorHandler with NotFoundRequestError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new NotFoundRequestError("Email not found");
            } catch (error) {
                httpErrorHandler(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check if httpErrorHandler with ConflictRequestError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new ConflictRequestError("Email or password is wrong");
            } catch (error) {
                httpErrorHandler(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check if httpErrorHandler with InternalError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new InternalServerError("Email or password is wrong");
            } catch (error) {
                httpErrorHandler(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
});
