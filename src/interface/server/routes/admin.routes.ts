import express, { Router } from "express";
import passwordAdminController from "../controllers/admin/password.admin.controller";
import registerAdminController from "../controllers/admin/register.admin.controller";
import { controllerWrapper } from "../wrappers/controller.wrapper";
const router: Router = express.Router();
const adminRouter = (): Router => {
    router.post("/password", controllerWrapper(passwordAdminController));
    router.post("/register", controllerWrapper(registerAdminController));
    return router;
};
export default adminRouter;
