import express, { Application, Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

const app: Application = express();

const AppDataSource = require("./infrastructure/postgres.datasources");

const port = process.env.PORT || 3000;

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
const casa = {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
};
console.log("CCCCCCCC");
console.log("C", casa);

createConnection()
    .then(async (connection) => {
        console.log("HOLA", connection);
    })
    .catch((error) => console.error(error));
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((error: any) => {
        console.error("Error during Data Source initialization", error);
    });
