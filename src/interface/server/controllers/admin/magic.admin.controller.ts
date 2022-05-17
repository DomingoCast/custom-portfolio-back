import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";

type CustomRequest = Request & {
    container?: AwilixContainer;
};

const magicAdminController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const token = req.query.token;
        console.log("BBBBBB");
        const response = container.magicUseCase(token);
        if (response)
            return res
                .status(200)
                .send({ message: "admin registration completed" });
        return res.status(401).send({
            message: "you need to change the password",
            token: token,
        });
    } catch (error: any) {
        console.log("AAAAAAA");
        httpHandlerError(error, next);
    }
};

export default magicAdminController;
