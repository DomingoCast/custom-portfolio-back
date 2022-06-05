import express, { Router } from "express";
import multer from "multer";
import checkToken from "../check-token";
import deletePostController from "../controllers/post/delete-post.controller";
import postPostController from "../controllers/post/post-post.controller";
import validateToken from "../validate-token";
import { controllerWrapper } from "../wrappers/controller.wrapper";

const router: Router = express.Router();

const postRouter = (): Router => {
    router.delete(
        "/:id",
        validateToken,
        controllerWrapper(deletePostController)
    );
    router.post(
        "/",
        multer({ dest: "uploads/" }).single("thumbnail"),
        checkToken,
        controllerWrapper(postPostController)
    );
    return router;
};
export default postRouter;
