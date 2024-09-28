import '../styles/mainPage.css';
import { useState } from 'react';
import Button from '../components/buttons/Button-main.jsx';
import Chats from '../components/ListChatsComponent.jsx';
import People from '../components/ListPeopleComponent.jsx';

const IndexPage = () => {
    const [switchChat, setswitchChat] = useState(true);
    return (
        <div className="main-container">
            <div className="main-switch">
                <Button
                    event={() => setswitchChat(true)}
                    style={{
                        border: 'none',
                        borderRadius: '0px',
                        backgroundColor: switchChat ? 'black' : '#ff073a',
                    }}
                >
                    Chats
                </Button>
                <Button
                    event={() => setswitchChat(false)}
                    style={{
                        border: 'none',
                        borderRadius: '0px',
                        backgroundColor: !switchChat ? 'black' : '#ff073a',
                    }}
                >
                    People
                </Button>
            </div>
            <div className="main-body">
                {switchChat ? <Chats /> : <People />}
            </div>
        </div>
    );
};

export default IndexPage;
