import { Schema, model } from 'mongoose';

const MessageModel = new Schema(
    {
        chat: { type: Schema.Types.ObjectId, ref: 'Chats', required: true },
        sender: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        content: { type: String },
    },
    {
        timestamps: { createdAt: true },
    }
);

export default model('Messages', MessageModel);
