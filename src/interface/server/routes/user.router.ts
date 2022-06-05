import express, { Router } from "express";
import getUserController from "../controllers/user/get-user-controller";
import getUser from "../get-user";
import { controllerWrapper } from "../wrappers/controller.wrapper";

const router: Router = express.Router();

const postRouter = (): Router => {
    router.get("/:userId", getUser, controllerWrapper(getUserController));
    return router;
};
export default postRouter;
