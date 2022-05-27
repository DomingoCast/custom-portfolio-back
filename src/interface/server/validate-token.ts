import { Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import jwt from "jsonwebtoken";
import CustomError from "../../core/errors/custom-error";
import InternalServerError from "../../infrastructure/http-errors/internal-error";

const validateToken: RequestHandler = (
    req: Request,
    res: Response,
    next: any
) => {
    let token = "";
    console.log("[COOKIES]", token);
    if (req.headers.token) token = <string>req.headers.token;
    if (req.cookies) if (req.cookies.token) token = <string>req.cookies.token;
    console.log("[COOKIES]", token);
    if (!token) throw new InternalServerError("No token");
    let decoded: any = { role: Role.worker };
    try {
        decoded = <User>(
            jwt.verify(<string>token, <string>process.env.JWT_SECRET!)
        );
    } catch (err) {
        console.log(err);
        next(new InternalServerError("Wrong Token"));
    }
    next();
};

export default validateToken;
