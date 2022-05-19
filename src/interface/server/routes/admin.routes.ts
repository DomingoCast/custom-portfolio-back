import express, { Router } from "express";
import passwordAdminController from "../controllers/admin/password.admin.controller";
import registerAdminController from "../controllers/admin/register.admin.controller";
const router: Router = express.Router();
const adminRouter = (): Router => {
    router.post("/register", registerAdminController);
    router.post("/password", passwordAdminController);
    return router;
};
export default adminRouter;
