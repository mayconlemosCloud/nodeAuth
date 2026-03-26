import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const userRoutes = Router();
const controller = new UserController();

// Public registration
userRoutes.post('/', controller.create);

// Protected routes
userRoutes.get('/', authMiddleware, controller.list);
userRoutes.get('/:id', authMiddleware, controller.getById);
userRoutes.put('/:id', authMiddleware, controller.update);
userRoutes.delete('/:id', authMiddleware, controller.remove);

export { userRoutes };
