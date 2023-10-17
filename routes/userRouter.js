import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post("/", userController.registerUser);
router.put("/:id", userController.updateUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllusers);
router.delete("/:id", userController.deleteUser);

export default router;
