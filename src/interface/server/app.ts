import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import CustomError from "../../core/errors/custom-error";
import HttpError from "../../infrastructure/http-errors/http-error";
import apiRouter from "./routes/api.router";
import loggerRequestMiddleware from "./middleware/log-request.middleware";
import cookieParser from "cookie-parser";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cookieParser());
    const corsOptions = {
        origin: "http://127.0.0.1:3000",
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));
    app.use(loggerRequestMiddleware);
    app.use("/api", apiRouter());

    app.use(
        (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
            if (error instanceof HttpError) {
                res.status(error.statusCode).send({
                    message: error.responseBody,
                });
            }
            res.status(500).send({
                message: "Internal server error",
            });
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
