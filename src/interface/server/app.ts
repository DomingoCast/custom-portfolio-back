import express, { Application, Request, Response } from "express";
import { DataSource } from "typeorm";
import registerController from "./controllers/register.controller";
import cors from "cors";

export const createServer = (port: number, dataSource: DataSource) => {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "Hello World!",
        });
    });
    app.post(
        "/register",
        async (req: Request, res: Response): Promise<Response> => {
            return registerController(req, dataSource, res);
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
    } catch (error) {
        console.error(`Error occured: ${error}`);
        return null;
    }
};
