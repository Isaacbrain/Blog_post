import express from "express";
import likeController from "../controllers/likeController.js";
const likeRouter = express.Router();

likeRouter.post("/", likeController.getLike);
likeRouter.get("/", likeController.getAllike)
likeRouter.delete("/:id", likeController.deleteLike);

export default likeRouter;