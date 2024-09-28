import { makeAutoObservable } from 'mobx';
import userService from '../services/userService.js';
import UserModel from '../models/UserModel.js';
import $api from '../http/api.js';

class UsertStore {
    _isAuth = false;
    _user = {};
    _isLoading = true;
    _users = [];
    _filterUsers = [];

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    get isAuth() {
        return this._isAuth;
    }

    setUser(userData) {
        if (userData.avatar === 'null') {
            userData.avatar = null;
        }

        const user = new UserModel(
            userData.id,
            userData.name,
            userData.age,
            userData.avatar
        );
        this._user = user;
    }

    get user() {
        return this._user;
    }

    setUsers(users) {
        this._users = users;
    }

    get users() {
        return this._users;
    }

    setIsLoading(boolean) {
        this._isLoading = boolean;
    }

    get isLoading() {
        return this._isLoading;
    }

    setFilterUsers(users) {
        this._filterUsers = users;
    }

    get filterUsers() {
        return this._filterUsers;
    }

    async registration(data) {
        const response = await userService.registration(data);
        if (response.status === 200) {
            const userData = response.data.user;
            this.setUser(userData);
            this.setIsAuth(true);
        }
        return response;
    }

    async login(data) {
        const response = await userService.login(data.email, data.password);
        if (response.status === 200) {
            const userData = response.data.user;
            this.setUser(userData);
            this.setIsAuth(true);
        }
        return response;
    }

    logout() {
        userService.logout();
        localStorage.removeItem('token');
        this.setIsAuth(false);
        this.setUser({});
    }

    async checkAuth() {
        if (localStorage.getItem('token')) {
            try {
                const response = await $api.get('/auth/refresh');
                localStorage.setItem('token', response.data.token);
                const user = response.data.user;
                if (user.avatar === 'null') {
                    user.avatar = `${process.env.REACT_APP_API_URL}/default.jpg`;
                } else {
                    user.avatar = `${process.env.REACT_APP_API_URL}/${user.avatar}`;
                }
                this.setUser(user);
                this.setIsAuth(true);
            } catch (e) {
                console.log(e);
            }
        }
    }

    async fetchAllUsers() {
        this.setIsLoading(true);
        let users = await userService.getAllUsers();
        this.setUsers(users);
        this.setFilterUsers(users);
        this.setIsLoading(false);
    }

    searchUsersForName(subName) {
        subName = subName.trim().toLowerCase();
        if (subName === '') {
            this.setFilterUsers(this.users);
        } else {
            const fillterUsers = this.users.filter((u) =>
                u.name.trim().toLowerCase().includes(subName)
            );
            this.setFilterUsers(fillterUsers);
        }
    }
}

export default new UsertStore();
