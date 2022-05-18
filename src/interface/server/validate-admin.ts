import { AwilixContainer } from "awilix";
import { Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import UnauthorizedError from "../../core/errors/unauthorized.error";

type CustomRequest = Request & {
    container?: AwilixContainer;
};
const validateAdmin: RequestHandler = (
    req: CustomRequest,
    res: Response,
    next: any
) => {
    const container = req.container!.cradle;
    const token = req.headers.token;
    if (!token) throw new UnauthorizedError("No token");
    try {
        const decoded = container.accessToken.verify(
            token,
            process.env.JWT_SECRET!
        );
        if (!decoded.data || decoded.data.role !== Role.admin)
            next(new UnauthorizedError("Unauthorized"));
    } catch (err) {
        next(new UnauthorizedError("Wrong Token"));
    }
    next();
};

export default validateAdmin;
