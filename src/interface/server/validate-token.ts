import { Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import jwt from "jsonwebtoken";
import CustomError from "../../core/errors/custom-error";
import { AwilixContainer } from "awilix";
import UnauthorizedRequestError from "../../infrastructure/http-errors/unauthorized-request-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};
const validateToken: RequestHandler = (
    req: CustomRequest,
    res: Response,
    next: any
) => {
    let token = "";
    if (req.headers.token) token = <string>req.headers.token;
    if (req.cookies) if (req.cookies.token) token = <string>req.cookies.token;
    if (!token) next(new UnauthorizedRequestError(new CustomError("No token")));
    let decoded: any = { role: Role.worker };
    try {
        decoded = <User>(
            jwt.verify(<string>token, <string>process.env.JWT_SECRET!)
        );
        req.user = decoded.data;
    } catch (err) {
        next(new UnauthorizedRequestError(new CustomError("Wrong Token")));
    }
    next();
};

export default validateToken;
