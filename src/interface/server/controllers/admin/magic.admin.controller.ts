import { NextFunction, Response } from "express";
import CustomError from "../../../../core/errors/custom-error";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import { CustomRequest } from "../../types/custom.request";

const magicAdminController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container?.cradle;
    const token = req.query.token;
    const response = container.magicUseCase(token);
    if (response)
        return res
            .status(200)
            .send({ message: "admin registration completed" });
    return res.status(401).send({
        message: "you need to change the password",
        token: token,
    });
};

export default magicAdminController;
