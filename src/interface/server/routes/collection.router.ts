import express, { Router } from "express";
import postCollectionController from "../controllers/collection/post-collection.controller";
const router: Router = express.Router();
const colectionRouter = (): Router => {
    router.post("/", postCollectionController);
    return router;
};
export default colectionRouter;
