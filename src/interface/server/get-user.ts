import { AwilixContainer } from "awilix";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Role } from "../../core/domain/user/role.enum";
import { User } from "../../core/domain/user/user";
import UnauthorizedError from "../../core/errors/unauthorized.error";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};
const getUser: RequestHandler = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const container = req.container!.cradle;
    const userId = req.params.userId;
    if (!userId) next(new UnauthorizedError("No token"));
    try {
        const user = await container.userRepository.findById(userId);
        if (!user) next(new UnauthorizedError("Unauthorized"));
        req.user = user;
    } catch (err) {
        next(new UnauthorizedError("Wrong userId"));
    }
    next();
};

export default getUser;
