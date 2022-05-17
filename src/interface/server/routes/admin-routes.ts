import express from "express";
import registerAdminController from "../controllers/admin/register.admin.controller";
import validateAdmin from "../validate-admin";
const router = express.Router();
const adminRoute = () => {
    router.use("/", validateAdmin);
    router.post("/register", registerAdminController);
};
export default adminRoute;
