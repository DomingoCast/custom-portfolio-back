import { Request, Response, NextFunction } from "express";
import { User } from "../../../core/domain/user/user";
import { AwilixContainer } from "awilix";
import trimFields from "../../../infrastructure/share/trim-fields/trim-fields";
import validateUser from "../../../infrastructure/user/validate-user/validate-user";
import { RegisterInfo } from "../../../core/domain/user/register-info";
import { Role } from "../../../core/domain/user/role.enum";
import arrayExceptions from "../../../infrastructure/share/trim-fields/array-exceptions";
import httpHandlerError from "../../../infrastructure/http-errors/http-error-handler";
import BadRequestError from "../../../infrastructure/http-errors/bad-request-error";
import InternalServerError from "../../../infrastructure/http-errors/internal-error";

type CustomRequest = Request & {
    user?: User;
    container?: AwilixContainer;
};

const registerController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const container = req.container?.cradle;
    try {
        if (req.user) {
            container.logger.info(req.user);
            return res.status(200).send({
                user: {
                    ...req.user,
                    password: "***",
                },
            });
        }
        throw new InternalServerError("An error has ocurred");
    } catch (error: any) {
        container.logger.error(error.message);
        httpHandlerError(error, next);
    }
};

export default registerController;
