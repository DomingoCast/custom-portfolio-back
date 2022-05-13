import { Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../../core/errors/unauthorized.error";

const validateAdmin: RequestHandler = (
    req: Request,
    res: Response,
    next: any
) => {
    const token = req.headers.token;
    console.log(token);
    if (!token) throw new UnauthorizedError("No token");
    let decoded: any = { role: Role.worker };
    try {
        decoded = <User>(
            jwt.verify(<string>token, <string>process.env.JWT_SECRET!)
        );
    } catch (err) {
        console.log(err);
        next(new UnauthorizedError("Wrong Token"));
    }
    if (Number(decoded.data.role) !== Role.admin)
        next(new UnauthorizedError("Unauthorized"));
    next();
};

export default validateAdmin;
