import express from 'express';
import { testPostController } from '../controllers/test.js';
import userAuth from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/test', userAuth, testPostController)

export default router;
