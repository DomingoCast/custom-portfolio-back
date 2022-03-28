import express, { Application, Request, Response } from "express";

const app: Application = express();

const AppDataSource = require("./infrastructure/postgres.datasources");

const port = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
        message: "Hello Worlds! AWUINO CAMBIA NADA",
    });
});

try {
    app.listen(port, (): void => {
        console.log("AAAAAAA");
        console.log(`Connected successfully on portal ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}
console.log("AAAAAAA");
console.log("VVVVV", process.env.POSTGRES_DB);
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error: any) => {
        console.error("Error during Data Source initialization", error);
    });
