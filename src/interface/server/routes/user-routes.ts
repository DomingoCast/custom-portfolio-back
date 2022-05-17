import express from "express";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
const router = express.Router();
const userRoute = () => {
    router.post("/login", loginController);
    router.post("/register", registerController);
    return router;
};
export default userRoute;
