import { Request, RequestHandler, Response, NextFunction } from "express";
import { Role } from "../../core/domain/user/role.enum";
import CustomError from "../../core/errors/custom-error";
import accessToken from "../../infrastructure/access-token/access-token";

const validateAdmin: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token: string | undefined = req.headers.token as string | undefined;
    if (!token) throw new CustomError("Token is missing");
    try {
        const decoded = accessToken().verify(token);
        if (Number(decoded) !== Role.admin)
            next(new CustomError("Unauthorized"));
    } catch (err) {
        console.log(err);
        next(new CustomError("Wrong Token"));
    }

    next();
};

export default validateAdmin;
