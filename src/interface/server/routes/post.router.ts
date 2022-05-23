import express, { Router } from "express";
import multer from "multer";
import checkToken from "../check-token";
import postPostController from "../controllers/post/post-post.controller";
import getUser from "../get-user";

const router: Router = express.Router();

const postRouter = (): Router => {
    router.post(
        "/",
        multer({ dest: "uploads/" }).single("thumbnail"),
        checkToken,
        postPostController
    );
    return router;
};
export default postRouter;
