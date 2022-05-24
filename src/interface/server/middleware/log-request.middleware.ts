import { Request, NextFunction, Response } from "express";
import getLogger from "../../../infrastructure/logger/get-logger";

const loggerRequestMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    getLogger().info(
        "Method: " +
            req.method +
            " ; Path: " +
            req.path +
            " ; Body: " +
            JSON.stringify(req.body)
    );
    next();
};

export default loggerRequestMiddleware;
