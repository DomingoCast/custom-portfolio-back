import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./api-docs/swagger-options";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import magicAdminController from "./controllers/admin/magic.admin.controller";
import CustomError from "../../core/errors/custom-error";
import loggerRequestMiddleware from "./middleware/log-request.middleware";
import HttpError from "../../infrastructure/http-errors/http-error";
import adminRouter from "./routes/admin.routes";
import validateAdmin from "./validate-admin";
import loginController from "./controllers/login.controller";
import registerController from "./controllers/register.controller";
import { controllerWrapper } from "./wrappers/controller.wrapper";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));
    app.use(loggerRequestMiddleware);

    app.use("/admin", adminRouter(), validateAdmin);
    app.post("/login", controllerWrapper(loginController));
    app.post("/register", controllerWrapper(registerController));

    app.get("/magic", controllerWrapper(magicAdminController));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.use(
        (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
            if (error instanceof HttpError) {
                res.status(error.statusCode).send({
                    message: error.responseBody,
                });
            }
        }
    );

    return {
        app: app,
        run: () => runServer(app, port),
    };
};

export const runServer = (app: Application, port: number) => {
    try {
        const server = app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
        return server;
    } catch (error: unknown) {
        if (error instanceof Error) throw new CustomError(error.message);
        throw new CustomError("Error ocurred into runServer");
    }
};
