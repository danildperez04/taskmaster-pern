import { Router } from 'express';
import userRouter from './users.routes';

const router = Router();

router.use('/users', userRouter);
// router.use('/tasks', );

export default router;