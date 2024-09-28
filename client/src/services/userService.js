import $api from '../http/api.js';
import UserModel from '../models/UserModel.js';

class UserService {
    async registration(data) {
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('name', data.name);
            formData.append('age', data.age);
            formData.append('avatar', data.avatar);

            const response = await $api.post('/auth/registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.setItem('token', response.data.token);
            const user = response.data.user;
            if (user.avatar === 'null') {
                user.avatar = `${process.env.REACT_APP_API_URL}/default.jpg`;
            } else {
                user.avatar = `${process.env.REACT_APP_API_URL}/${user.avatar}`;
            }
            return response;
        } catch (e) {
            const errors = e.response.data.arr.map((a) => ({
                name: a.path,
                message: a.msg,
            }));
            return {
                status: 400,
                errors,
            };
        }
    }

    async login(email, password) {
        try {
            const response = await $api.post('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            const user = response.data.user;
            if (user.avatar === 'null') {
                user.avatar = `${process.env.REACT_APP_API_URL}/default.jpg`;
            } else {
                user.avatar = `${process.env.REACT_APP_API_URL}/${user.avatar}`;
            }
            return response;
        } catch (e) {
            const errors = e.response.data.arr.map((a) => ({
                name: a.path,
                message: a.msg,
            }));
            return {
                status: 400,
                errors,
            };
        }
    }

    logout() {
        $api.post('/auth/logout');
    }

    async getAllUsers() {
        try {
            const response = await $api.get('/user/all');
            let users = response.data.users;
            users = users.map((u) => {
                if (u.avatar === 'null') {
                    u.avatar = `${process.env.REACT_APP_API_URL}/default.jpg`;
                } else {
                    u.avatar = `${process.env.REACT_APP_API_URL}/${u.avatar}`;
                }
                return new UserModel(u.id, u.name, u.age, u.avatar);
            });
            return users;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

export default new UserService();
