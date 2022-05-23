import express, { Router } from "express";
import checkToken from "../check-token";
import getCollectionController from "../controllers/collection/get-collection.controller";
import getCollectionsController from "../controllers/collection/get-collections.controller.";
import postCollectionController from "../controllers/collection/post-collection.controller";
import getUser from "../get-user";
import multer from "multer";

const router: Router = express.Router();

const collectionRouter = (): Router => {
    router.get("/user/:userId", getUser, getCollectionsController);
    router.get("/:collectionId", getCollectionController);
    router.post(
        "/",
        multer({ dest: "uploads/" }).single("thumbnail"),
        checkToken,
        postCollectionController
    );
    return router;
};
export default collectionRouter;
