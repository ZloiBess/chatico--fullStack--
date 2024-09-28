import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth-rout.js';
import route from './routes/user-rout.js';
import mongoose from 'mongoose';
import errorMiddleware from './middlewares/error-middleware.js';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
//express
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONT_URL,
        credentials: true,
    })
);
app.use(express.static('./static'));
app.use('/auth', authRoute);
app.use('/user', route);
app.use(errorMiddleware);
//http
const server = http.createServer(app);
//socket
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
io.of('/chat').on('connection', (socket) => {
    console.log('user connection:', socket.id);

    socket.on('joinRoom', (room) => {
        console.log('user enter room:' + room);
        socket.join(room);
    });
    socket.on('sendMessage', ({ from, to, message }) => {
        socket.to(to).emit('receiveMessage', { from, message });
    });
});

const start = async () => {
    try {
        //http server
        server.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
        //mongo
        await mongoose.connect(DB_URI);
        console.log('Database started');
    } catch (e) {
        console.log(e);
    }
};
start();
