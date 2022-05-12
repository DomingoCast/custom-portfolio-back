import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const magicAdminController = async (
    req: CustomRequest,
    res: Response,
    next: any
): Promise<Response | void> => {
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
        httpHandlerError(e, next);
    }
};

export default magicAdminController;
