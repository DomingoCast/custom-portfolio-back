import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import CustomError from "../../core/errors/custom-error";
import HttpError from "../../infrastructure/http-errors/http-error";
import validateAdmin from "./validate-admin";
import apiRouter from "./routes/api.router";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));
    app.use("/api", apiRouter(), validateAdmin);

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
