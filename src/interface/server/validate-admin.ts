import { Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import jwt from "jsonwebtoken";
import CustomError from "../../infrastructure/errors/custom-error";

const validateAdmin: RequestHandler = (
    req: Request,
    res: Response,
    next: any
) => {
    const token = req.headers.token;
    console.log(token);
    if (!token) throw new CustomError("No token");
    let decoded: any = { role: Role.worker };
    try {
        decoded = <User>(
            jwt.verify(<string>token, <string>process.env.JWT_SECRET!)
        );
    } catch (err) {
        console.log(err);
        next(new CustomError("Wrong Token"));
    }
    console.log("[DECODED]", decoded, decoded.data, decoded.data.role);
    if (Number(decoded.data.role) !== Role.admin)
        next(new CustomError("Unauthorized"));
    next();
};

export default validateAdmin;
