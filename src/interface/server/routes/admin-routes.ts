import express, { Router } from "express";
import registerAdminController from "../controllers/admin/register.admin.controller";
const router: Router = express.Router();
const adminRoute = () => {
    router.post("/register", registerAdminController);
    return router;
};
export default adminRoute;
