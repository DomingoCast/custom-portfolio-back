import express, { Application, Request, Response } from "express";
import validateRegister from "../infrastructure/user/user-validate/validate-user-data-form";

export const createServer = (port: number) => {
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
            try {
                const dataForm = req.body;
                const validate = validateRegister(dataForm);
                if (!validate) {
                    return res.status(409).send({ message: validate });
                }
                return res.status(200).send({
                    "<h1>Recibed data From User</h1><br>": dataForm,
                });
            } catch (e) {
                return res.status(500).send({
                    message: "Internal server error",
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
    } catch (error) {
        console.error(`Error occured: ${error}`);
        return null;
    }
};
