import express from "express";
import postController from "../controllers/postController.js";
const router = express.Router();

router.post("/", postController.registerPost);
router.put("/:id", postController.updatePost);
router.get("/:id", postController.getPost);
router.get("/", postController.getAllPost);
router.delete("/:id", postController.deletePost);

export default router;
