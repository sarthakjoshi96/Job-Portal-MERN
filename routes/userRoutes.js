import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUserController, updateUserController } from "../controllers/userControllers.js";

const router = express.Router()

router.put('/update', userAuth, updateUserController)
router.post("/getUser", userAuth, getUserController);

export default router;
