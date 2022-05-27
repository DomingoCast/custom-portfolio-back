import express, { Router } from "express";
import registerAdminController from "../controllers/admin/register.admin.controller";
import { controllerWrapper } from "../wrappers/controller.wrapper";
const router: Router = express.Router();
const adminRouter = (): Router => {
    router.post("/register", controllerWrapper(registerAdminController));
    return router;
};
export default adminRouter;
