import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import MessagesPage from './pages/MessagesPage.jsx';

const authRoutes = [
    {
        path: '/main',
        Component: MainPage,
    },
    {
        path: '/message/:id',
        Component: MessagesPage,
    },
    {
        path: '/*',
        Component: MainPage,
    },
];

const publicRoutes = [
    {
        path: '/registration',
        Component: RegistrationPage,
    },
    {
        path: '/login',
        Component: LoginPage,
    },
    {
        path: '/*',
        Component: RegistrationPage,
    },
];

export { authRoutes, publicRoutes };
