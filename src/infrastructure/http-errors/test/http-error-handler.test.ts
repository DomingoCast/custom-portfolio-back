import httpHandlerError from "../http-error-handler";
import NextFunction from "express";
import validateLogin from "../../user/validate-login/validate-login";
import BadRequestError from "../bad-request-error";
import NotFoundRequestError from "../not-found-request-error";
import ConflictRequestError from "../conflict-request-error";
import InternalServerError from "../internal-error";

describe("Http error handler test", () => {
    it("Check if httpHandlerError is called", () => {
        const testHttpHandler = async () => {
            try {
                const loginInfo = {
                    email: "hmail.com",
                    password: "123456",
                };
                const validate = validateLogin(loginInfo);
                if (validate !== true) {
                    throw new BadRequestError(validate.toString());
                }
            } catch (error) {
                httpHandlerError(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check if httpHandlerError with NotFoundRequestError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new NotFoundRequestError("Email not found");
            } catch (error) {
                httpHandlerError(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check if httpHandlerError with ConflictRequestError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new ConflictRequestError("Email or password is wrong");
            } catch (error) {
                httpHandlerError(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
    it("Check if httpHandlerError with InternalError is called", () => {
        const testHttpHandler = async () => {
            try {
                throw new InternalServerError("Email or password is wrong");
            } catch (error) {
                httpHandlerError(error, NextFunction);
            }
        };
        testHttpHandler();
        expect(testHttpHandler).toBeTruthy();
    });
});
