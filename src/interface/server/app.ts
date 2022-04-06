import express, { Application, Request, Response } from "express";
import { DataSource } from "typeorm";
import registerController from "./controllers/register.controller";

export const createServer = (port: number, dataSource: DataSource) => {
    const app: Application = express();

    // Body parsing Middleware
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
            const response = await registerController(req, dataSource);

            return res.status(200).send({
                message: response,
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
        app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
    } catch (error) {
        console.error(`Error occured: ${error}`);
    }
};
