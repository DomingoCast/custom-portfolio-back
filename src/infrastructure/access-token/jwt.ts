import jwt from "jsonwebtoken";
import CustomError from "../errors/custom-error";
import "dotenv/config";
const JWT_SECRET: string = process.env.JWT_SECRET || "test";

const jwtToken = () => {
    const createToken = () => {
        try {
            return jwt.sign(
                { exp: Math.floor(Date.now() / 1000) + 60 * 60 },
                JWT_SECRET
            );
        } catch (error: any) {
            throw new CustomError(error.message);
        }
    };
    const verifyToken = (token: string) => {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error: any) {
            throw new CustomError(error.message);
        }
    };
    return {
        createToken,
        verifyToken,
    };
};

export default jwtToken;
