import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};

const getUserController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    return res.status(200).send({ user: req.user! });
};

export default getUserController;
