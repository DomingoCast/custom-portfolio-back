import express, { Application, Request, Response } from "express";
import { DataSource } from "typeorm";
import { User } from "../../core/domain/user/User";
import registerUser from "../../core/use-cases/register";
import { createDBConnection } from "../../infrastructure/postgres.datasources";
import createUserRepository from "../../infrastructure/user/user.datasource";
import registerController from "./controllers/register.controller";

export const createServer = (port: number, dataSource: DataSource) => {
    const app: Application = express();

    // Body parsing Middleware
    require("dotenv").config();
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
function AppDataSource(AppDataSource: any) {
    throw new Error("Function not implemented.");
}
