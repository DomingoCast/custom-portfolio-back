import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import validateLogin from "../../../infrastructure/user/validate-login/validate-login";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import { LoginInfo } from "../../../core/domain/user/login-info";
import BadRequestError from "../../../infrastructure/http-errors/bad-request-error";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";
import path from "path";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const imageController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    res.sendFile(
        path.join(__dirname, "../../../../uploads", req.params.imageName)
    );
};

export default imageController;
