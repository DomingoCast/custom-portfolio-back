import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import validateUser from "../../../../infrastructure/user/validate-user/validate-user";

type CustomRequest = Request<{}, {}, any> & {
    container?: AwilixContainer;
};

const magicAdminController = async (
    req: CustomRequest,
    res: Response
): Promise<Response> => {
    const container = req.container!.cradle;
    try {
        console.log(req.query.token);
        const token = req.query.token;
        const decoded = container.accessToken.verify(token);
        console.log(decoded);
        if (decoded.data.changePassword)
            return res
                .status(400)
                .send({
                    message: "you need to change the password",
                    token: token,
                });
        return res
            .status(200)
            .send({ message: "admin registration completed" });
    } catch (e) {
        container.logger.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default magicAdminController;
