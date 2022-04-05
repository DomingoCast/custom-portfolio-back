import express, { Application, Request, Response } from "express";
import { User } from "./core/domain/user/User";
import registerUser from "./core/use-cases/register";
import createUserRepository from "./infrastructure/user/user.datasource";

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
    "/register",
    async (req: Request, res: Response): Promise<Response> => {
        const userRepository = createUserRepository(AppDataSource);
        const user: Omit<User, "id"> = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
        };
        console.log(user);
        const newUser = await registerUser(user, userRepository);
        return res.status(200).send({
            message: newUser,
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
