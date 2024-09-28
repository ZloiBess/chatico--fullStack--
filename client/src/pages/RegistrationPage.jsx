import '../styles/form/form.css';
import Button from '../components/buttons/Button-main';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserStore from '../store/UserStore';

const RegistrationPage = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
    });

    const submit = async (e) => {
        e.preventDefault();
        setErrors({
            email: '',
            password: '',
            name: '',
            age: '',
        });

        const response = await UserStore.registration({
            name,
            age,
            email,
            password,
            avatar,
        });
        if (response.status === 400) {
            response.errors.forEach((err) => {
                setErrors((prev) => ({
                    ...prev,
                    [err.name]: err.message,
                }));
            });
        }
    };

    return (
        <div className="container-form">
            <form className="form">
                <label htmlFor="email">
                    Email: <span style={{ color: 'red' }}>{errors.email}</span>
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">
                    Password:
                    <span style={{ color: 'red' }}>{errors.password}</span>
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="name">
                    Name:<span style={{ color: 'red' }}>{errors.name}</span>
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                />
                <label htmlFor="age">
                    Age:<span style={{ color: 'red' }}>{errors.age}</span>
                </label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="age"
                />
                <label htmlFor="avatar">Avatar:</label>
                <input
                    type="file"
                    id="avatar"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
                <Button type="submit" event={submit}>
                    Registration
                </Button>
                <div>If you have an account, log in here:</div>
                <Button style={{ padding: '0' }}>
                    <Link
                        style={{
                            display: 'block',
                            height: '100%',
                            padding: '4px',
                        }}
                        to={'/login'}
                    >
                        Login
                    </Link>
                </Button>
            </form>
        </div>
    );
};

export default RegistrationPage;
