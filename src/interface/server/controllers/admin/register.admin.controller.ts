import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { RegisterInfo } from "../../../../core/domain/user/register-info";
import { Role } from "../../../../core/domain/user/role.enum";
import { User } from "../../../../core/domain/user/user";
import validateUser from "../../../../infrastructure/user/validate-user/validate-user";

type CustomRequest = Request<{}, {}, RegisterInfo> & {
    container?: AwilixContainer;
};

const registerAdminController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container?.cradle;
    const dataForm = req.body;
    const validate = validateUser(dataForm);
    if (validate !== true) {
        container.logger.error(validate);
        return res.status(400).send({ message: validate, casa: req.header });
    }
    const user: RegisterInfo = req.body;
    const response: null | User = await container.registerUserUseCase(
        user,
        Role.admin
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
    return res.status(409).send({ message: "User already exits" });
};

export default registerAdminController;
