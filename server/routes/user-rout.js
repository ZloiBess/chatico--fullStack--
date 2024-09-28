import express from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
const route = express.Router();

route.get('/all', authMiddleware, userController.getAllUsers);
route.get('/chat', authMiddleware, userController.getAllChats);
route.get('/chat/:id', authMiddleware, userController.getAllMessages);
route.post('/chat/:id', authMiddleware, userController.sendMessage);

export default route;
