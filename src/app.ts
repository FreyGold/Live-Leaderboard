import express from 'express';
import exampleRouter from './routes/example.route.ts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/exampleRoute', exampleRouter);

export default app;
