import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type FileItem = {
    type: 'file' | 'folder';
    name: string;
    previewUrl?: string;
    children?: FileItem[];
};

type FileContextType = {
    root: FileItem[];
    currentPath: string[];
    getCurrentItems: () => FileItem[];
    navigateToFolder: (folderName: string) => void;
    navigateBack: () => void;
    addFilesToCurrentFolder: (files: File[]) => void;
    reset: () => void;
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

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
    const ctx = useContext(FileContext);
    if (!ctx) throw new Error('useFileContext must be used within FileProvider');
    return ctx;
};

export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [root, setRoot] = useState<FileItem[]>(initialRoot);
    const [currentPath, setCurrentPath] = useState<string[]>([]);

    const getCurrentItems = (): FileItem[] => {
        let items = root;
        for (const folderName of currentPath) {
            const found = items.find(
                (i) => i.type === 'folder' && i.name === folderName,
            );
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

        // Рекурсивное обновление вложенных папок
        const updated = [...root];

        const updateRecursively = (
            items: FileItem[],
            path: string[],
            newChildren: FileItem[],
        ) => {
            if (path.length === 0) return;
            const folderName = path[0];
            const folder = items.find(
                (f) => f.type === 'folder' && f.name === folderName,
            );
            if (!folder || !folder.children) return;
            if (path.length === 1) {
                folder.children = newChildren;
            } else {
                updateRecursively(folder.children, path.slice(1), newChildren);
            }
        };

        updateRecursively(updated, currentPath, newItems);
        setRoot(updated);
    };

    const navigateToFolder = (folderName: string) => {
        setCurrentPath((prev) => [...prev, folderName]);
    };

    const navigateBack = () => {
        setCurrentPath((prev) => prev.slice(0, -1));
    };

    const addFilesToCurrentFolder = (files: File[]) => {
        const newFileItems: FileItem[] = files.map((file) => {
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

    const reset = () => {
        setRoot(initialRoot);
        setCurrentPath([]);
    };

    return (
        <FileContext.Provider
            value={{
                root,
                currentPath,
                getCurrentItems,
                navigateToFolder,
                navigateBack,
                addFilesToCurrentFolder,
                reset,
            }}
        >
            {children}
        </FileContext.Provider>
    );
};
