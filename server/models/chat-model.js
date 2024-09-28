import { Schema, model } from 'mongoose';

const ChatModel = new Schema(
    {
        participants: [
            { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        ],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Messages',
        },
    },
    {
        timestamps: { updatedAt: false },
    }
);

export default model('Chats', ChatModel);
