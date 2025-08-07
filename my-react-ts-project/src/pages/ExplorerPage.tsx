import { FileProvider, useFileContext } from '../components/FileContext.tsx';
import { FileItem } from '../components/FileItem.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { UploadZone } from '../components/UploadZone.tsx';
import { LogoutButton } from '../components/LogoutButton.tsx';
import './ExplorerPage.css';

const ExplorerContent = () => {
    const { getCurrentItems } = useFileContext();
    const items = getCurrentItems();

    return (
        <>
            <h1>Файловый Проводник</h1>
            <LogoutButton />

            <Breadcrumbs />

            <ul className="file-list">
                {items.map((item) => (
                    <FileItem key={item.name} item={item} />
                ))}
            </ul>
        </>
    );
};

export default function ExplorerPage() {
    return (
        <FileProvider>
            <UploadZone>
                <div className="explorer">
                    <ExplorerContent />
                </div>
            </UploadZone>
        </FileProvider>
    );
}
