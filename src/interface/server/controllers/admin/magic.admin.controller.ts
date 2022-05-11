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
        return res.status(200).send({ message: req.params });
    } catch (e) {
        container.logger.error(e);
        return res.status(500).send({
            message: e,
        });
    }
};

export default magicAdminController;
