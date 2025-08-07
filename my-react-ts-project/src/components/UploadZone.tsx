// UploadZone.tsx
import React from 'react';
import { useFileContext } from './FileContext';

export const UploadZone: React.FC<{ children: React.ReactNode }> = ({
                                                                        children,
                                                                    }) => {
    const { addFilesToCurrentFolder } = useFileContext();

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length) {
            addFilesToCurrentFolder(files);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div className="upload-zone" onDrop={handleDrop} onDragOver={handleDragOver}>
            {children}
        </div>
    );
};
