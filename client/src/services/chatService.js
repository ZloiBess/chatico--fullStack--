import $api from '../http/api.js';

class ChatService {
    async getAllChats() {
        try {
            const response = await $api.get('/user/chat');
            let chats = response.data.chats;
            chats = chats.map((c) => {
                if (c.avatar === 'null') c.avatar = 'default.jpg';
                return {
                    userId: c.userId,
                    avatar: `${process.env.REACT_APP_API_URL}/${c.avatar}`,
                    name: c.name,
                    lastMessage: c.lastMessage,
                    lastMessageCreatedAt: c.lastMessageCreatedAt
                        .split('.')[0]
                        .replace('T', ' '),
                };
            });
            return chats;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async getAllMessages(userId) {
        try {
            const response = await $api.get(`user/chat/${userId}`);
            const messages = response.data.messages;
            return messages;
        } catch (e) {
            return [];
        }
    }

    async sendMessage(userId, context) {
        try {
            return await $api.post(`/user/chat/${userId}`, { context });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export default new ChatService();
