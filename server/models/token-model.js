import { Schema, model } from 'mongoose';

const TokenModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
});

export default model('Tokens', TokenModel);
