import express, { Application, Request, Response } from "express";
import { DataSource } from "typeorm";
import registerController from "./controllers/register.controller";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./api-docs/swagger-options";

export const createServer = (port: number, dataSource: DataSource) => {
    const app: Application = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        "/api-docs",
        cors(),
        swaggerUi.serve,
        swaggerUi.setup(swaggerOptions)
    );
    /**
     * @openapi
     *  get:
     *     summary: This endpoint is to prove that this endpoint works well.
     *     tags: [Home]
     *      responses:
     *       '200':
     *         description: Response Hello World.
     *         content:
     *           application/json:
     *            schema:
     *              type: object
     *              properties:
     *                 message:
     *                  type: string
     *                  example: Hello world!
     */
    app.get(
        "/",
        cors(),
        async (req: Request, res: Response): Promise<Response> => {
            return res.status(200).send({
                message: "Hello world!",
            });
        }
    );
    app.post(
        "/register",
        cors(),
        async (req: Request, res: Response): Promise<Response> => {
            return registerController(req, dataSource, res);
        }
    );

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
    } catch (error) {
        console.error(`Error occured: ${error}`);
        return null;
    }
};
