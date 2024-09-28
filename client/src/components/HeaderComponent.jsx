import '../styles/header/header.css';
import ButtonMain from './buttons/Button-main.jsx';
import { observer } from 'mobx-react-lite';
import UserStore from '../store/UserStore.js';

const HeaderComponent = () => {
    const isAuth = UserStore.isAuth;

    const clickOnLogout = () => {
        UserStore.logout();
    };

    const PublickHeaderElement = () => {
        return (
            <div className="header">
                <h1 className="header-title">CHATICO</h1>
            </div>
        );
    };

    const AuthHeaderElement = () => {
        return (
            <div className="header">
                <div className="header-user">
                    <div className="header-user__avatar">
                        <img src={UserStore.user.avatar} alt="avatar" />
                    </div>
                    <div className="header-user__data">
                        <div>iD: {UserStore.user.id}</div>
                        <div>Name: {UserStore.user.name}</div>
                        <div>age: {UserStore.user.age}</div>
                    </div>
                </div>
                <h1 className="header-title">CHATICO</h1>
                <div className="header-logout">
                    <ButtonMain event={clickOnLogout}>Logout</ButtonMain>
                </div>
            </div>
        );
    };

    return isAuth ? <AuthHeaderElement /> : <PublickHeaderElement />;
};

export default observer(HeaderComponent);
