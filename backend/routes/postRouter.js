import express from "express";
import postController from "../controllers/postController.js";
// import tokenVerification from "../middleware/authUser.js";
import authUser from "../middleware/authUser.js";
const router = express.Router();

router.post("/", authUser.tokenVerification, postController.registerPost);
router.put("/:id", postController.updatePost);
router.get("/:id", postController.getPost);
router.get("/", authUser.tokenVerification, postController.getAllPost);
router.delete("/:id", postController.deletePost);

export default router;
