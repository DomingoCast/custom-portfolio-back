import express, { Router } from "express";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import validateAdmin from "../validate-admin";
import adminRouter from "./admin.router";
import magicAdminController from "../controllers/admin/magic.admin.controller";
import collectionRouter from "./collection.router";
import postRouter from "./post.router";
import userRouter from "./user.router";
import { controllerWrapper } from "../wrappers/controller.wrapper";
import imageController from "../controllers/image.controler";

const router: Router = express.Router();

const apiRouter = (): Router => {
    router.get("/", (req: any, res: any) =>
        res.status(200).send("Hello, World!")
    );
    router.use("/admin", adminRouter(), validateAdmin);
    router.use("/collection", collectionRouter());
    router.use("/post", postRouter());
    router.use("/user", userRouter());
    router.get("/image/:imageName", controllerWrapper(imageController));
    router.post("/login", controllerWrapper(loginController));
    router.post("/register", controllerWrapper(registerController));

    router.get("/magic", controllerWrapper(magicAdminController));
    return router;
};
export default apiRouter;
