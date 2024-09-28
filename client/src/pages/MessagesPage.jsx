import Button from '../components/buttons/Button-main.jsx';
import '../styles/messagePage.css';
import { useParams, Link } from 'react-router-dom';
import ChatStore from '../store/ChatStore.js';
import UserStore from '../store/UserStore.js';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import socket from '../socketMessageConfig.js';

const MessagesPage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchMessages();

        socket.emit('joinRoom', UserStore.user.id);
        socket.on('receiveMessage', ({ from, message }) => {
            if (from === id) {
                ChatStore.setMessages([
                    ...ChatStore.messages,
                    { id, content: message },
                ]);
            }
        });
        return () => {
            socket.off();
        };
    }, []);

    useEffect(() => {
        scrollMessages();
    }, [ChatStore.messages]);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const response = await ChatStore.sendMessage(id, message);
        if (response?.status === 200) {
            try {
                //socket
                socket.emit('sendMessage', {
                    from: UserStore.user.id,
                    to: id,
                    message,
                });
                //render current page
                ChatStore.setMessages([
                    ...ChatStore.messages,
                    { sender: UserStore.user.id, content: message },
                ]);
            } catch (e) {
                console.log(e);
            }
        }
        setMessage('');
    };

    const fetchMessages = async () => {
        await ChatStore.fetchMessages(id);
    };

    const scrollMessages = () => {
        const messageListElement = document.querySelector('.message-list');
        messageListElement.scrollTop = messageListElement.scrollHeight;
    };

    return (
        <div className="message-container">
            <Link to={'/'} style={{ display: 'block' }}>
                <Button
                    style={{
                        height: '50px',
                        backgroundColor: 'black',
                        borderRadius: '0',
                        borderWidth: '0',
                        borderBottom: '3px solid rgb(255, 7, 58)',
                        position: 'relative',
                        zIndex: '300',
                    }}
                >
                    Back
                </Button>
            </Link>
            <div className="message-body">
                <ol className="message-list">
                    {ChatStore.messages.map((m, i) => (
                        <li
                            key={i}
                            className={`message-item ${
                                m.sender === UserStore.user.id
                                    ? 'message-left'
                                    : 'message-right'
                            }`}
                        >
                            {m.content}
                        </li>
                    ))}
                </ol>
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="message..."
                className="message-textarea"
            ></textarea>
            <button className="message-btn" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default observer(MessagesPage);
