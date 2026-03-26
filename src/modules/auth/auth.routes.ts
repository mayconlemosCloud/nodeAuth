import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRoutes = Router();
const controller = new AuthController();

// Use async handler wrapper or try-catch for error middleware to catch it
// Since we are using express 4.x, we need either express-async-errors or manual try-catch
// For simplicity and portfolio show-off, we'll implement a clean architecture.

authRoutes.post('/login', controller.login);

export { authRoutes };
