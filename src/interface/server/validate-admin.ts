import { Request, RequestHandler, Response, NextFunction } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { AwilixContainer } from "awilix";
import UnauthorizedError from "../../core/errors/unauthorized.error";

type CustomRequest = Request & {
    container?: AwilixContainer;
};
const validateAdmin: RequestHandler = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const container = req.container?.cradle;
    const token: string | string[] | undefined = req.headers.token;
    if (!token) throw new UnauthorizedError("No token");
    try {
        const decoded = container.accessToken.verify(token);
        if (!decoded.data || decoded.data.role !== Role.admin)
            next(new UnauthorizedError("Unauthorized"));
    } catch (err) {
        next(new UnauthorizedError("Wrong Token"));
    }
    next();
};

export default validateAdmin;
