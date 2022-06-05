import express, { Router } from "express";
import checkToken from "../check-token";
import getCollectionController from "../controllers/collection/get-collection.controller";
import getCollectionsController from "../controllers/collection/get-collections.controller.";
import postCollectionController from "../controllers/collection/post-collection.controller";
import getUser from "../get-user";
import multer from "multer";
import validateToken from "../validate-token";
import getMyCollectionsController from "../controllers/collection/get-my-collections.controller";
import { controllerWrapper } from "../wrappers/controller.wrapper";

const router: Router = express.Router();

const collectionRouter = (): Router => {
    router.get(
        "/mine",
        validateToken,
        controllerWrapper(getMyCollectionsController)
    );
    router.get(
        "/user/:userId",
        getUser,
        controllerWrapper(getCollectionsController)
    );
    router.get("/:collectionId", controllerWrapper(getCollectionController));
    router.post(
        "/",
        multer({ dest: "uploads/" }).single("thumbnail"),
        validateToken,
        controllerWrapper(postCollectionController)
    );
    return router;
};
export default collectionRouter;
