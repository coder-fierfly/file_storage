import React from 'react';

const LoginPage: React.FC = () => {
    return (
        <div>
            <h1>Вход</h1>
            <form>
                <input type="text" placeholder="Логин" />
                <input type="password" placeholder="Пароль" />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;
