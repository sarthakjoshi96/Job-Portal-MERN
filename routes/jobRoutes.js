import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobController, getAllJobsController, deleteJobController, jobStatsController, applyJobsController } from "../controllers/jobControllers.js";

const router = express.Router()

router.post('/create', userAuth, createJobController)
router.get('/get', userAuth, getAllJobsController)
router.delete("/delete/:id", userAuth, deleteJobController);
router.get("/job-stats", userAuth, jobStatsController);
router.post("/apply", userAuth, applyJobsController)

export default router
