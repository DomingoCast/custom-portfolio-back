import jwt from "jsonwebtoken";
import "dotenv/config";
import { VerifyResponse, AccessTokenResponse } from "./verify.type";
import { LoginInfo } from "../../core/domain/user/login-info";
import CustomError from "../../core/errors/custom-error";
const JWT_SECRET: string = process.env.JWT_SECRET || "test";
const throwhError = (errorMessage: string): Error => {
    return new CustomError(errorMessage);
};

const jwtToken = () => {
    const createToken = (
        userLogin: Omit<LoginInfo, "password">
    ): AccessTokenResponse => {
        try {
            return jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: userLogin,
                },
                JWT_SECRET
            );
        } catch (error: unknown) {
            if (error instanceof Error) throwhError(error.message);
            if (!(error instanceof Error)) throwhError("Error creating token");
        }
    };
    const verifyToken = (token: string): VerifyResponse => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            if (error instanceof Error) throwhError(error.message);
            if (!(error instanceof Error)) throwhError("Error verifying token");
        }
    };
    return {
        createToken,
        verifyToken,
    };
};

export default jwtToken;
