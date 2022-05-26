import express, { Router } from "express";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import validateAdmin from "../validate-admin";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../api-docs/swagger-options";
import adminRouter from "./admin.router";
import magicAdminController from "../controllers/admin/magic.admin.controller";

const router: Router = express.Router();

const apiRouter = (): Router => {
    router.use("/admin", adminRouter(), validateAdmin);
    router.post("/login", loginController);
    router.post("/register", registerController);
    router.get("/magic", magicAdminController);
    router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
    return router;
};
export default apiRouter;
