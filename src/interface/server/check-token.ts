import { AwilixContainer } from "awilix";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import UnauthorizedRequestError from "../../infrastructure/http-errors/unauthorized-request-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};
const checkToken: RequestHandler = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const container = req.container!.cradle;
    let token = "";
    if (req.headers.token) token = <string>req.headers.token;
    if (req.cookies) if (req.cookies.token) token = <string>req.cookies.token;
    if (!token) next(new UnauthorizedRequestError("No token"));
    console.log("[TOKENASO]", token, req.cookies);
    try {
        const decoded = container.accessToken.verify(
            token,
            process.env.JWT_SECRET!
        );
        console.log("DECODED", decoded, decoded.data);
        if (!decoded.data) next(new UnauthorizedRequestError("Unauthorized"));
        req.user = decoded.data;
    } catch (err) {
        next(new UnauthorizedRequestError("Wrong Token"));
    }
    next();
};

export default checkToken;
