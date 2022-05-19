import express, {
    Application,
    Request,
    Response,
    NextFunction,
    Router,
} from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./api-docs/swagger-options";
import { container } from "../../infrastructure/dependency-injection/awilix-set-up";
import { scopePerRequest } from "awilix-express";
import magicAdminController from "./controllers/admin/magic.admin.controller";
import CustomError from "../../core/errors/custom-error";
import adminRouter from "./routes/admin.routes";
import validateAdmin from "./validate-admin";
import loginController from "./controllers/login.controller";
import registerController from "./controllers/register.controller";

export const createServer = (port: number) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));

    app.use("/admin", adminRouter(), validateAdmin);

    app.post("/login", loginController);

    app.post("/register", registerController);

    app.get("/magic", magicAdminController);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.log("[ERROR]", error);
        res.status(error.statusCode ? error.statusCode : 500).send({
            message: error.responseBody,
        });
    });

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
    } catch (error: any) {
        throw new CustomError(error);
    }
};
