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
import CustomError from "../../core/errors/custom-error";
import loggerRequest from "./middleware/log-request.middleware";
import adminRoute from "./routes/admin.routes";
import validateAdmin from "./validate-admin";
import loginController from "./controllers/login.controller";
import registerController from "./controllers/register.controller";

export const createServer = (port: number) => {
    const app: Application = express();
    const adminRouter: Router = adminRoute();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));
    app.use((req: Request, _res: Response, next: NextFunction) => {
        loggerRequest(req, next);
    });

    app.use("/admin", validateAdmin, adminRouter);
    app.post("/login", loginController);
    app.post("/register", registerController);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.use((error: any, req: Request, res: Response, _next: NextFunction) => {
        res.status(error.statusCode).send({
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
