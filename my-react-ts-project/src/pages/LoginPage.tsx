import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Эмуляция базы данных
const FAKE_USER = {
    username: 'asd',
    password: 'asd',
    name: 'Администратор',
    email: 'asd@example.com',
};

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            navigate('/explorer');
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === FAKE_USER.username && password === FAKE_USER.password) {
            // Сохраняем пользователя в localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                username: FAKE_USER.username,
                name: FAKE_USER.name,
                email: FAKE_USER.email,
            }));
            navigate('/explorer');
        } else {
            setError('Неверный логин или пароль');
        }
        // Здесь может быть логика проверки логина/пароля
    };

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    );
};

export default LoginPage;
