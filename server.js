import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan'; //for url path view in console logs
import express from 'express'; //for routing and rest apis functionalities
import dotenv from 'dotenv'
import connecDB from './config/db.js';
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

connecDB();

const app = express()
const PORT = process.env.PORT || 8080

//routes

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/job', jobRoutes)

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Node server listening on ${PORT}`);
});

