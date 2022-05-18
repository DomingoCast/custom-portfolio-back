import { Request, NextFunction } from "express";
import getLogger from "../../../infrastructure/logger/get-logger";

const loggerRequest = (req: Request, next: NextFunction) => {
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

export default loggerRequest;
