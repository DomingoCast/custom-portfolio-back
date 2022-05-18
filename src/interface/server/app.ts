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
import adminRoute from "./routes/admin.routes";
import userRoute from "./routes/user.routes";
import validateAdmin from "./validate-admin";

export const createServer = (port: number) => {
    const app: Application = express();
    const adminRoutes: Router = adminRoute();
    const userRoutes: Router = userRoute();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(scopePerRequest(container));

    app.use("/admin", validateAdmin, adminRoutes);
    app.use("/", userRoutes);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
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
