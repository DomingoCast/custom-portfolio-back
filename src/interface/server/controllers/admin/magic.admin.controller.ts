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
        if (container.magicUseCase)
            return res
                .status(200)
                .send({ message: "admin registration completed" });
        return res.status(401).send({
            message: "you need to change the password",
            token: token,
        });
    } catch (error) {
        httpHandlerError(error, next);
    }
};

export default magicAdminController;
