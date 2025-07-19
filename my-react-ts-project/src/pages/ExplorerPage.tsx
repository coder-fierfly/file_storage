import React, { useState } from 'react';
import './ExplorerPage.css';

type FileItem = {
    type: 'file' | 'folder';
    name: string;
    previewUrl?: string; // если это изображение
    children?: FileItem[];
};

const initialRoot: FileItem[] = [
    {
        type: 'folder',
        name: 'Документы',
        children: [
            { type: 'file', name: 'Резюме.pdf' },
            { type: 'file', name: 'Смета.xlsx' },
        ],
    },
    {
        type: 'folder',
        name: 'Фото',
        children: [
            { type: 'file', name: 'отпуск.jpg' },
            {
                type: 'folder',
                name: '2024',
                children: [{ type: 'file', name: 'новый_год.png' }],
            },
        ],
    },
    { type: 'file', name: 'README.txt' },
];

export default function ExplorerPage() {
    const [root, setRoot] = useState<FileItem[]>(initialRoot);
    const [currentPath, setCurrentPath] = useState<string[]>([]);

    const getCurrentItems = (): FileItem[] => {
        let items = root;
        for (const folderName of currentPath) {
            const found = items.find((i) => i.type === 'folder' && i.name === folderName);
            if (found && found.children) items = found.children;
            else return [];
        }
        return items;
    };

    const updateCurrentItems = (newItems: FileItem[]) => {
        if (currentPath.length === 0) {
            setRoot(newItems);
            return;
        }

        const updated = [...root];
        let items = updated;
        for (let i = 0; i < currentPath.length; i++) {
            const folder = items.find(f => f.type === 'folder' && f.name === currentPath[i]);
            if (folder && folder.children) {
                if (i === currentPath.length - 1) {
                    folder.children = newItems;
                } else {
                    items = folder.children;
                }
            }
        }

        setRoot(updated);
    };

    const handleFolderClick = (folderName: string) => {
        setCurrentPath([...currentPath, folderName]);
    };

    const handleBack = () => {
        setCurrentPath(currentPath.slice(0, -1));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        const newFileItems: FileItem[] = files.map(file => {
            const isImage = file.type.startsWith('image/');
            return {
                type: 'file',
                name: file.name,
                previewUrl: isImage ? URL.createObjectURL(file) : undefined,
            };
        });

        const currentItems = getCurrentItems();
        updateCurrentItems([...currentItems, ...newFileItems]);
    };

    return (
        <div
            className="explorer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <h1>Файловый Проводник</h1>

            <div className="breadcrumb">
                <button onClick={handleBack} disabled={currentPath.length === 0}>🔙 Назад</button>
                <span> /{currentPath.join('/')}</span>
            </div>

            <ul className="file-list">
                {getCurrentItems().map((item) => (
                    <li
                        key={item.name}
                        className={`item ${item.type}`}
                        onClick={() => item.type === 'folder' && handleFolderClick(item.name)}
                    >
                        {item.type === 'folder' ? (
                            <>📁 {item.name}</>
                        ) : (
                            <div>
                                📄 {item.name}
                                {item.previewUrl && (
                                    <div className="image-preview">
                                        <img src={item.previewUrl} alt={item.name} />
                                    </div>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
