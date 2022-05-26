import { AwilixContainer } from "awilix";
import { Request, Response, NextFunction } from "express";
import { RegisterInfo } from "../../../../core/domain/user/register-info";
import { User } from "../../../../core/domain/user/user";
import CustomError from "../../../../core/errors/custom-error";
import InternalBadRequestError from "../../../../core/errors/internal-bad-request-error";
import httpErrorHandler from "../../../../infrastructure/http-errors/http-error-handler";
import InternalServerError from "../../../../infrastructure/http-errors/internal-error";
import arrayExceptions from "../../../../infrastructure/share/trim-fields/array-exceptions";
import trimFields from "../../../../infrastructure/share/trim-fields/trim-fields";
import validateUser from "../../../../infrastructure/user/validate-user/validate-user";
import ConflictError from "../../../../core/errors/conflict-error";

type CustomRequest = Request<{}, {}, RegisterInfo> & {
    container?: AwilixContainer;
};

const registerAdminController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container?.cradle;
    try {
        let dataForm = req.body;
        if (req.body !== null) {
            dataForm = trimFields(req.body, arrayExceptions);
            container.logger.info("Trim fields from login info");
        }
        const validate = validateUser(dataForm);
        if (validate !== true) {
            container.logger.error(validate);
            throw new InternalBadRequestError(validate.toString());
        }
        const user: RegisterInfo = req.body;
        const response: null | User = await container.registerUserUseCase(
            user,
            "admin"
        );
        if (response) {
            container.logger.info(response);
            const token = container.accessToken.create({
                ...response,
                changePassword: true,
            });
            console.log(container.accessToken.verify(token));
            return res
                .status(200)
                .send({ message: "User has been registered", token: token });
        }
        container.logger.error("User already exits");
        throw new ConflictError("User already exits");
    } catch (error: unknown) {
        if (error instanceof CustomError) next(httpErrorHandler(error));
        next(httpErrorHandler(new InternalServerError(error as Error)));
    }
};

export default registerAdminController;
