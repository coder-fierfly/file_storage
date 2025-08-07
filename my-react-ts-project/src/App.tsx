import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import LoginPage from './pages/LoginPage';
import ExplorerPage from './pages/ExplorerPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Вложенные маршруты под защитой */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/explorer/*" element={<ExplorerPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
