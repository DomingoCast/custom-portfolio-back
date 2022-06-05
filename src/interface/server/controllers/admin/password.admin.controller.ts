import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import CustomError from "../../../../core/errors/custom-error";
import InternalServerError from "../../../../infrastructure/http-errors/internal-server-error";
import validatePassword from "../../../../infrastructure/user/validate-password/validate-password";

type CustomRequest = Request<{}, {}, { password: string }> & {
    container?: AwilixContainer;
};

const passwordAdminController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    const password = req.body;
    const token = req.headers.token;
    const validate = validatePassword(password);
    if (validate !== true) {
        container.logger.error(validate);
        return res.status(400).send({ message: validate });
    }
    const decoded = container.accessToken.verify(token);

    const response: null | User = await container.passwordUserUseCase(
        decoded.data.id,
        password.password
    );
    if (response) {
        const token = container.accessToken.create(response);
        container.logger.info(response);
        return res.status(200).send({ token: token });
    }
    throw new InternalServerError(new CustomError("An error has ocurred"));
};

export default passwordAdminController;
