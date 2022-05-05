import express, { Application } from "express";
import registerController from "./controllers/register.controller";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./api-docs/swagger-options";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import loginController from "./controllers/login.controller";
import CustomError from "../../infrastructure/errors/custom-error";
import registerAdminController from "./controllers/admin/register.admin.controller";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).send(err);
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.post("/login", loginController);

    app.post("/register", registerController); // makeInvoker(registerController));

<<<<<<< HEAD
    app.post("/admin/register", registerAdminController);
=======
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).send({ message: err.message });
    });
>>>>>>> e0c253862da8cbd2d6dfaea829b6b793416183b8

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
