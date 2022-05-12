import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import jwt from "../../../../infrastructure/access-token/jwt";
import { container } from "../../../../infrastructure/dependency-injection/awilix-set-up";
import validatePassword from "../../../../infrastructure/user/validate-password/validate-password";
import validateUser from "../../../../infrastructure/user/validate-user/validate-user";

type CustomRequest = Request<{}, {}, any> & {
    container?: AwilixContainer;
};

const passwordAdminController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container!.cradle;
    try {
        const { password, token } = req.body;
        const validate = validatePassword({ password });
        if (validate !== true) {
            container.logger.error(validate);
            return res
                .status(400)
                .send({ message: validate, casa: req.header });
        }
        const decoded = container.accessToken.verify(token);

        const response: null | User = await container.passwordUserUseCase(
            decoded.data.id
        );
        if (response) {
            container.logger.info(response);
            return res
                .status(200)
                .send({ message: "User has been passworded" });
        }
        container.logger.error("User already exits");
        return res.status(409).send({ message: "User already exits" });
    } catch (e) {
        container.logger.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default passwordAdminController;
