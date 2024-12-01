import express, { Application } from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.ts';
import scoreRouter from './routes/score.route.ts';
import userRouter from './routes/user.routes.ts';
import gameRouter from './routes/game.routes.ts';
import { globalErrorHandler } from 'middleware/globalErrorHandler.ts';
import cors from 'cors';

const app: Application = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use('/user', userRouter);
app.use('/scores', scoreRouter);
app.use('/game', gameRouter);
app.use(globalErrorHandler);

export default app;
