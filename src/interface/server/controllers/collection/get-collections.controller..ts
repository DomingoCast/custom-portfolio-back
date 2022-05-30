import { AwilixContainer } from "awilix";
import { NextFunction, Request, Response } from "express";
import { Collection } from "../../../../core/domain/collection/collection";
import { User } from "../../../../core/domain/user/user";
import httpHandlerError from "../../../../infrastructure/http-errors/http-error-handler";
import InternalServerError from "../../../../infrastructure/http-errors/internal-error";
import validateCollection from "../../../../infrastructure/user/validate-collection/validate-collection";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};

const getCollectionsController = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const container = req.container!.cradle;
    try {
        const response: null | User = await container.getCollectionsUseCase(
            req.user
        );
        if (response) {
            if (req.cookies && req.cookies.token) {
                try {
                    const token = container.accesToken.verify(
                        req.cookies.token
                    );
                    if (token.data.id === req.params.userId!)
                        return res
                            .status(200)
                            .send({ collections: response, mine: true });
                } catch (e) {
                    console.error(e);
                }
            }
            container.logger.info(response);
            return res.status(200).send({ collections: response });
        }
        throw new InternalServerError("something went wrong");
    } catch (e: any) {
        container.logger.error(e);
        httpHandlerError(e, next);
    }
};

export default getCollectionsController;
