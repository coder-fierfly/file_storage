import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import LoginPage from './pages/LoginPage';
import ExplorerPage from './pages/ExplorerPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/explorer/*" element={<ExplorerPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
