import express, { Application } from 'express';
import exampleRouter from './routes/example.route.ts';
import { globalErrorHandler } from 'middleware/globalErrorHandler.ts';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/exampleRoute', exampleRouter);
app.use(globalErrorHandler);

export default app;
