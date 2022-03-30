import express, { Application, Request, Response } from "express";

export const createServer = (port: number) => {
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
            return res.status(200).send({
                message: "This is a POST request",
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
