import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { RegisterInfo } from "../../../../core/domain/user/register-info";
import { User } from "../../../../core/domain/user/user";
import validateUser from "../../../../infrastructure/user/validate-user/validate-user";

type CustomRequest = Request<{}, {}, RegisterInfo> & {
    container?: AwilixContainer;
};

const registerAdminController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container!.cradle;
    try {
        const dataForm = req.body;
        const validate = validateUser(dataForm);
        if (validate !== true) {
            container.logger.error(validate);
            return res.status(400).send({ message: validate });
        }
        const user: RegisterInfo = req.body;
        const response: null | User = await container.registerUserUseCase(
            user,
            "admin"
        );
        if (response) {
            container.logger.info(response);
            return res
                .status(200)
                .send({ message: "User has been registered" });
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

export default registerAdminController;
