import { AwilixContainer } from "awilix";
import { Request, Response } from "express";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const magicAdminController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<Response> => {
    const container = req.container!.cradle;
    try {
        const token = req.query.token;
        const decoded = container.accessToken.verify(token);
        if (decoded.data.changePassword)
            return res.status(400).send({
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
