import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/user/user.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/ping', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use(errorMiddleware);

export { app };
