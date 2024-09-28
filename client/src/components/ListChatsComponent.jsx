import '../styles/list-messages/listMessages.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ChatStore from '../store/ChatStore.js';
import { observer } from 'mobx-react-lite';
import UserStore from '../store/UserStore.js';
import socket from '../socketMessageConfig.js';

const ListMessagesComponent = () => {
    const chats = ChatStore.filterChats;

    useEffect(() => {
        fetchChats();
        //when receiving a new message, fetch all chats
        socket.emit('joinRoom', UserStore.user.id);
        socket.on('receiveMessage', () => {
            fetchChats();
        });
        return () => {
            socket.off();
        };
    }, []);

    const fetchChats = async () => {
        await ChatStore.fetchChats();
    };

    const searchChats = (subName) => {
        ChatStore.searchChats(subName);
    };

    if (ChatStore.isLoading) {
        return <div style={{ color: 'red' }}>Loading</div>;
    } else {
        return (
            <div className="main-body__messages">
                <div className="search-message">
                    <input
                        id="search-message__input"
                        type="text"
                        placeholder="search"
                        onChange={(e) => searchChats(e.target.value)}
                    ></input>
                </div>
                <ol className="list-messages">
                    {chats.map((m, inex) => (
                        <Link
                            key={inex}
                            to={`/message/${m.userId}`}
                            style={{ display: 'block' }}
                        >
                            <li className="item-message">
                                <div className="item-message__avatar">
                                    <img src={m.avatar} alt="avatar" />
                                </div>
                                <div className="item-message__body item-body">
                                    <div className="item-body__name">
                                        {m.name}
                                    </div>
                                    <div className="item-body__last-message">
                                        {m.lastMessage}
                                    </div>
                                </div>
                                <div className="item-body__timestamp">
                                    {m.lastMessageCreatedAt}
                                </div>
                            </li>
                        </Link>
                    ))}
                </ol>
            </div>
        );
    }
};

export default observer(ListMessagesComponent);
