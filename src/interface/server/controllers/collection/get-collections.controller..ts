import { AwilixContainer } from "awilix";
import { Request, Response } from "express";
import { User } from "../../../../core/domain/user/user";
import CustomError from "../../../../core/errors/custom-error";

type CustomRequest = Request & {
    container?: AwilixContainer;
    user?: User;
};

const getCollectionsController = async (
    req: CustomRequest,
    res: Response
): Promise<Response | void> => {
    const container = req.container!.cradle;
    const response: null | User = await container.getCollectionsUseCase(
        req.user
    );
    if (response) {
        if (req.cookies && req.cookies.token) {
            try {
                const token = container.accesToken.verify(req.cookies.token);
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
    throw new CustomError("something went wrong");
};

export default getCollectionsController;
