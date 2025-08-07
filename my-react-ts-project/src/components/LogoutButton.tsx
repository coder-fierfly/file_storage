// LogoutButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return <button onClick={handleLogout}>Выйти</button>;
};
