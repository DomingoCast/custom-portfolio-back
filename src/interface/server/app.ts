import express, { Application, Request, Response, NextFunction } from "express";
import registerController from "./controllers/register.controller";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./api-docs/swagger-options";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import loginController from "./controllers/login.controller";
import registerAdminController from "./controllers/admin/register.admin.controller";
import validateAdmin from "./validate-admin";
import CustomError from "../../core/errors/custom-error";
import getLogger from "../../infrastructure/logger/get-logger";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));
    app.use((req: Request) => {
        return getLogger().info(
            "Method: " +
                req.method +
                " ;Path: " +
                req.path +
                " ;Body: " +
                JSON.stringify(req.body)
        );
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.post("/login", loginController);

    app.post("/register", registerController); // makeInvoker(registerController));

    app.use("/admin", validateAdmin);
    app.post("/admin/register", registerAdminController);

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(error.statusCode).send({
            message: error.responseBody,
        });
    });

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
    } catch (error: any) {
        throw new CustomError(error);
    }
};
