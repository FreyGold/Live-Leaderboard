import express from 'express';
import exampleRouter from './routes/example.route.ts';
import { globalErrorHandler } from 'middleware/globalErrorHandler.ts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/exampleRoute', exampleRouter);
app.use(globalErrorHandler);

export default app;
