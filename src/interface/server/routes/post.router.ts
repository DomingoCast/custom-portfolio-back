import express, { Router } from "express";
import postPostController from "../controllers/post/post-post.controller";
import getUser from "../get-user";

const router: Router = express.Router();

const postRouter = (): Router => {
    router.post("/", getUser, postPostController);
    return router;
};
export default postRouter;
