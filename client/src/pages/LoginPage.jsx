import { useState } from 'react';
import Button from '../components/buttons/Button-main';
import { Link } from 'react-router-dom';
import '../styles/form/form.css';
import UserStore from '../store/UserStore.js';

const LoginPage = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const [errorValid, setErrorValid] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setErrorValid('');
        const response = await UserStore.login(data);
        if (response.status === 400) {
            setErrorValid('Invalid value');
        }
    };

    return (
        <div className="container-form">
            <form className="form">
                <label htmlFor="email">
                    Email: <span style={{ color: 'red' }}>{errorValid}</span>
                </label>
                <input
                    type="text"
                    id="email"
                    value={data.email}
                    placeholder="email"
                    onChange={(e) =>
                        setData((prevent) => ({
                            ...prevent,
                            email: e.target.value,
                        }))
                    }
                />
                <label htmlFor="password">
                    Password: <span style={{ color: 'red' }}>{errorValid}</span>
                </label>
                <input
                    type="password"
                    id="password"
                    value={data.password}
                    placeholder="password"
                    onChange={(e) =>
                        setData((prevent) => ({
                            ...prevent,
                            password: e.target.value,
                        }))
                    }
                />

                <Button type="submit" event={submit}>
                    Login
                </Button>
                <label>Create an Account:</label>
                <Button style={{ padding: '0' }}>
                    <Link
                        style={{
                            display: 'block',
                            height: '100%',
                            padding: '4px',
                        }}
                        to={'/registration'}
                    >
                        Registration
                    </Link>
                </Button>
            </form>
        </div>
    );
};

export default LoginPage;
