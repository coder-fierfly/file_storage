// Breadcrumbs.tsx
import React from 'react';
import { useFileContext } from './FileContext';

export const Breadcrumbs: React.FC = () => {
    const { currentPath, navigateBack } = useFileContext();

    return (
        <div className="breadcrumb">
            <button onClick={navigateBack} disabled={currentPath.length === 0}>
                🔙 Назад
            </button>
            <span> /{currentPath.join('/')}</span>
        </div>
    );
};
