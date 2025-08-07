// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
    const user = localStorage.getItem('currentUser');

    // Если пользователь не авторизован, редиректим на логин
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Если авторизован — рендерим вложенные маршруты
    return <Outlet />;
};

export default ProtectedRoute;
