import messageModel from '../models/message-model.js';

class MessageService {
    async createMessage(chat, sender, content, session) {
        try {
            const message = await messageModel.create(
                [{ chat, sender, content }],
                { session }
            );
            return message[0];
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getAllMessages(chat) {
        try {
            let messages = await messageModel.find({ chat });

            return messages.map((message) => {
                return {
                    sender: message.sender,
                    content: message.content,
                    createdAt: message.createdAt,
                };
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default new MessageService();
