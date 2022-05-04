import jwt from "jsonwebtoken";
import CustomError from "../errors/custom-error";
import "dotenv/config";
import { VerifyResponse } from "./verify.type";
const JWT_SECRET: string = process.env.JWT_SECRET || "test";

const jwtToken = () => {
    const createToken = (userLogin: any): string => {
        try {
            return jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: userLogin,
                },
                JWT_SECRET
            );
        } catch (error: any) {
            throw new CustomError(error.message);
        }
    };
    const verifyToken = (token: string): VerifyResponse => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error: any) {
            throw new CustomError(error);
        }
    };
    return {
        createToken,
        verifyToken,
    };
};

export default jwtToken;
