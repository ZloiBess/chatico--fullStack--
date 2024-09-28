import '../styles/list-people/listPeople.css';
import Button from './buttons/Button-main.jsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import UserStore from '../store/UserStore.js';
import { observer } from 'mobx-react-lite';

const ListPeopleComponent = () => {
    const people = UserStore.filterUsers;

    useEffect(() => {
        fetchPeople();
    }, []);

    const fetchPeople = async () => {
        UserStore.fetchAllUsers();
    };

    const searchPeople = (subName) => {
        UserStore.searchUsersForName(subName);
    };

    if (UserStore.isLoading) {
        return <div style={{ color: 'red' }}>Loading</div>;
    } else {
        return (
            <div className="main-body__people">
                <div className="search-user">
                    <input
                        id="search-user__input"
                        type="text"
                        placeholder="search"
                        onChange={(e) => searchPeople(e.target.value)}
                    ></input>
                </div>
                <ol className="list-people">
                    {people.map((user, i) => (
                        <li key={i} className="item-people">
                            <div className="item-people__avatar">
                                <img src={user.avatar} alt="avatar" />
                            </div>
                            <div className="item-people__name">{user.name}</div>
                            <div className="item-people__btn">
                                <Button
                                    style={{
                                        padding: '0',
                                        backgroundColor: '#ff073a',
                                    }}
                                >
                                    <Link
                                        style={{
                                            display: 'block',
                                            height: '100%',
                                            padding: '10px',
                                        }}
                                        to={`message/${user.id}`}
                                    >
                                        Send message
                                    </Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
};

export default observer(ListPeopleComponent);
