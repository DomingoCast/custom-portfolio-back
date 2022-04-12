import express, { Application, Request, Response } from "express";
import registerController from "./controllers/register.controller";
import cors from "cors";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest, makeInvoker } from "awilix-express";

export const createServer = (port: number) => {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));

    app.get("/", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    });
    app.post("/register", registerController); //makeInvoker(registerController));

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
    } catch (error) {
        console.error(`Error occured: ${error}`);
        return null;
    }
};
