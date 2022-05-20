import jwt from "jsonwebtoken";
import "dotenv/config";
import { VerifyResponse, AccessTokenResponse } from "./verify.type";
import { LoginInfo } from "../../core/domain/user/login-info";
import CustomError from "../../core/errors/custom-error";
const JWT_SECRET: string = process.env.JWT_SECRET || "test";
const throwhError = (error: Error): Error => {
    if (error instanceof Error) throw new CustomError(error.message);
    throw new CustomError(error);
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
            throwhError(error as Error);
        }
    };
    const verifyToken = (token: string): VerifyResponse => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throwhError(error as Error);
        }
    };
    return {
        createToken,
        verifyToken,
    };
};

export default jwtToken;
