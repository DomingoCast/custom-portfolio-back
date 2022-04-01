import express, { Application, Request, Response } from "express";

const app: Application = express();

const AppDataSource = require("./infrastructure/postgres.datasources");

const port = process.env.PORT || 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello World!",
    });
});

app.post(
    "/register/validate",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = req.body;
            return res
                .status(200)
                .send({ "<h1>Recibed data From User</h1>": user });
        } catch (e) {
            return res.status(500).send({
                message: "Internal server error",
            });
        }
    }
);

app.post(
    "/register",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({
            message: "This is a POST request",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error: any) => {
        console.error("Error during Data Source initialization", error);
    });
