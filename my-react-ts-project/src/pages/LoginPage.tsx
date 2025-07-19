import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь может быть логика проверки логина/пароля
        navigate('/explorer');
    };

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Логин"/>
                <input type="password" placeholder="Пароль"/>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;
