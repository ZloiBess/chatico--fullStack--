import { makeAutoObservable } from 'mobx';
import chatService from '../services/chatService.js';

class ChatStore {
    _chats = [];
    _filterChats = [];
    _messages = [];
    _isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setChats(chats) {
        this._chats = chats;
    }

    get chats() {
        return this._chats;
    }

    setFilterChats(chats) {
        this._filterChats = chats;
    }

    get filterChats() {
        return this._filterChats;
    }

    setMessages(messages) {
        this._messages = messages;
    }

    get messages() {
        return this._messages;
    }

    setIsLoading(boolean) {
        this._isLoading = boolean;
    }

    get isLoading() {
        return this._isLoading;
    }

    async fetchChats() {
        this.setIsLoading(true);
        const chats = await chatService.getAllChats();
        chats.sort((a, b) => {
            return (
                new Date(b.lastMessageCreatedAt) -
                new Date(a.lastMessageCreatedAt)
            );
        });
        this.setChats(chats);
        this.setFilterChats(chats);
        this.setIsLoading(false);
    }

    async fetchMessages(userId) {
        const messages = await chatService.getAllMessages(userId);
        this.setMessages(messages);
        this.setFilterChats(messages);
    }

    async sendMessage(userId, message) {
        return await chatService.sendMessage(userId, message);
    }

    searchChats(subName) {
        subName = subName.trim().toLowerCase();
        if (subName === '') {
            this.setFilterChats(this.chats);
        } else {
            const fillterChats = this.chats.filter((u) =>
                u.name.trim().toLowerCase().includes(subName)
            );
            this.setFilterChats(fillterChats);
        }
    }
}

export default new ChatStore();
