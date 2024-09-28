import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes.js';
import { observer } from 'mobx-react-lite';
import userStore from '../store/UserStore.js';
import { useEffect, useState } from 'react';

const AppRouterComponent = () => {
    const isAuth = userStore.isAuth;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            await userStore.checkAuth();
            setIsLoading(false);
        };
        fetch();
    }, []);

    if (isLoading) {
        return <div>LOADING</div>;
    } else {
        return (
            <Routes>
                {isAuth
                    ? authRoutes.map(({ path, Component }) => (
                          <Route
                              key={path}
                              path={path}
                              element={<Component />}
                          />
                      ))
                    : publicRoutes.map(({ path, Component }) => (
                          <Route
                              key={path}
                              path={path}
                              element={<Component />}
                          />
                      ))}
            </Routes>
        );
    }
};

export default observer(AppRouterComponent);
