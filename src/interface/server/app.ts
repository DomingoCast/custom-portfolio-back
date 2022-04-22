import express, { Application } from "express";
import registerController from "./controllers/register.controller";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./api-docs/swagger-options";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import CustomError from "./errors/custom-error";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.post("/register", registerController); // makeInvoker(registerController));

    return {
        app: app,
        run: () => runServer(app, port),
    };
};

export const runServer = (app: Application, port: number) => {
    try {
        // const error = "Hola";
        // throw new CustomError(error);
        const server = app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
        return server;
    } catch (error: any | CustomError) {
        throw new CustomError(error);
    }
};
