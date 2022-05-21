import { AwilixContainer } from "awilix";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import UnauthorizedError from "../../core/errors/unauthorized.error";

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
    const token = req.headers.token;
    if (!token) throw new UnauthorizedError("No token");
    try {
        const decoded = container.accessToken.verify(
            token,
            process.env.JWT_SECRET!
        );
        if (!decoded.data) next(new UnauthorizedError("Unauthorized"));
        req.user = decoded.data;
    } catch (err) {
        next(new UnauthorizedError("Wrong Token"));
    }
    next();
};

export default checkToken;
