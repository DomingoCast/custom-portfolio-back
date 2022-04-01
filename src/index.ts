import express, { Application, Request, Response } from "express";
import testRepository from "./core/ports/test.repository";
import testAwilixController from "./core/use-cases/test-awilix";
// import awilix, { Lifetime } from "awilix";
import testDatasource from "./infrastructure/test.datasource";
const awilix = require("awilix");

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
    testDatasource: awilix.asFunction(testDatasource),
    testRepository: awilix.asFunction(testRepository),
});
// container.loadModules(["core/ports/*.repository.ts"], {
//     resolverOptions: {
//         lifetime: Lifetime.SINGLETON,
//     },
// });

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
app.get("/awilix", async (req: Request, res: Response): Promise<Response> => {
    testAwilixController(container.resolve("testRepository"));
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

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!");
//     })
//     .catch((error: any) => {
//         console.error("Error during Data Source initialization", error);
//     });
