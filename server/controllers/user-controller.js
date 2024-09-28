import userService from '../services/user-service.js';
import chatService from '../services/chat-service.js';
import ApiError from '../errors/api-error.js';

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAll(req.user);
            return res.json({ users });
        } catch (e) {
            next(e);
        }
    }

    async getAllChats(req, res, next) {
        try {
            const myId = req.user.id;
            const chats = await chatService.getAllChats(myId);
            return res.json({ chats });
        } catch (e) {
            next(e);
        }
    }

    async sendMessage(req, res, next) {
        try {
            const myId = req.user.id;
            const toUserId = req.params.id;
            const context = req.body.context;
            await chatService.sendMessage(myId, toUserId, context);
            return res.json({ message: 'Success' });
        } catch (e) {
            next(e);
        }
    }

    async getAllMessages(req, res, next) {
        try {
            const myId = req.user.id;
            const toUserId = req.params.id;
            const messages = await chatService.getAllMessages(myId, toUserId);
            return res.json({ messages });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
