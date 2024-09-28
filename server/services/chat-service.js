import chatModel from '../models/chat-model.js';
import messageService from './message-service.js';
import { mongoose, startSession } from 'mongoose';
import ApiError from '../errors/api-error.js';

class ChatService {
    async sendMessage(myId, toUserId, content) {
        const session = await startSession();
        try {
            session.startTransaction();

            myId = new mongoose.Types.ObjectId(myId);
            toUserId = new mongoose.Types.ObjectId(toUserId);

            let chat = await chatModel
                .findOne({
                    participants: { $all: [myId, toUserId] },
                })
                .session(session);

            if (!chat) {
                chat = await chatModel.create(
                    [{ participants: [myId, toUserId] }],
                    { session }
                );
                chat = chat[0];
            }

            const message = await messageService.createMessage(
                chat._id,
                myId,
                content,
                session
            );
            chat.lastMessage = message._id;
            await chat.save({ session });

            await session.commitTransaction();
            return chat;
        } catch (e) {
            console.log(e);
            await session.abortTransaction();
            throw e;
        } finally {
            await session.endSession();
        }
    }

    async getAllChats(userId) {
        try {
            let chats = await chatModel
                .find({ participants: userId })
                .populate({
                    path: 'participants',
                    select: 'name avatar',
                    match: { _id: { $ne: userId } },
                })
                .populate({
                    path: 'lastMessage',
                    select: 'content createdAt',
                });

            chats = chats.map((chat) => {
                return {
                    userId: chat.participants[0]._id,
                    avatar: chat.participants[0].avatar || 'default.jpg',
                    name: chat.participants[0].name || 'Unknown',
                    lastMessage: chat.lastMessage.content || '',
                    lastMessageCreatedAt: chat.lastMessage.createdAt,
                };
            });
            return chats;
        } catch (e) {
            console.log(e);
            throw ApiError.BadRequest('error');
        }
    }

    async getAllMessages(myId, toUserId) {
        if (toUserId === 'undefined') {
            throw ApiError.BadRequest('chat not found');
        }

        try {
            myId = new mongoose.Types.ObjectId(myId);
            toUserId = new mongoose.Types.ObjectId(toUserId);
            const chat = await chatModel.findOne({
                participants: { $all: [myId, toUserId] },
            });
            const messages = await messageService.getAllMessages(chat._id);
            return messages;
        } catch (e) {
            console.log(e);
            throw ApiError.BadRequest('error');
        }
    }
}

export default new ChatService();
