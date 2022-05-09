import { Response, Request } from "express";

const wrapperController = (controller: Function) => {
    const run = (req: Request, res: Response, next: any) => {
        try {
            controller(req, res, next);
        } catch (error: any) {
            next(error);
        }
    };
    return run;
};
export default wrapperController;
