import express, { Application, Request, Response } from "express";
import validateRegister from "../core/use-cases/user/validate-user/validate-register";

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
            return res.status(200).send({
                message: "This is a POST request",
            });
        }
    );

    app.post(
        "/register/validate",
        async (req: Request, res: Response): Promise<Response | undefined> => {
            try {
                const dataForm = req.body;
                const validate = validateRegister(dataForm);
                if (validate === true) {
                    return res.status(200).send({
                        "<h1>Recibed data From User</h1><br>": dataForm,
                    });
                } else {
                    return res
                        .status(400)
                        .send({ message: validate[0].message });
                }
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
        app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
    } catch (error) {
        console.error(`Error occured: ${error}`);
    }
};
