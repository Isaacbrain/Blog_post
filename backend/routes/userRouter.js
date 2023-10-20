import express from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validations/userValidation.js";
import authUser from "../middleware/authUser.js";
import postController from "../controllers/postController.js";

const router = express.Router();
router.get("/posts", authUser.tokenVerification, userController.userPosts);
router.post(
  "/login",
  authUser.userInfo,
  userController.loginUser,
  postController.getAllPost
);
router.post("/", userController.registerUser);
router.put("/:id", userValidation, userController.updateUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllusers);
router.delete("/:id", userController.deleteUser);

export default router;
