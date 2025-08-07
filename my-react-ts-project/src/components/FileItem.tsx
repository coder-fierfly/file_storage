// FileItem.tsx
import React from 'react';
import type {FileItem as FileItemType} from './FileContext';
import {useFileContext} from './FileContext';

type Props = {
    item: FileItemType;
};

export const FileItem: React.FC<Props> = ({item}) => {
    const {navigateToFolder} = useFileContext();

    const handleClick = () => {
        if (item.type === 'folder') {
            navigateToFolder(item.name);
        }
    };

    return (
        <li
            className={`item ${item.type}`}
            onClick={handleClick}
            style={{cursor: item.type === 'folder' ? 'pointer' : 'default'}}
        >
            {item.type === 'folder' ? (
                <>📁 {item.name}</>
            ) : (
                <>
                    📄 {item.name}
                    {item.previewUrl && (
                        <div className="image-preview">
                            <img src={item.previewUrl} alt={item.name}/>
                        </div>
                    )}
                </>
            )}
        </li>
    );
};
