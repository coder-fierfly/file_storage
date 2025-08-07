export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'image' | 'zip';
    size?: string;
    children?: FileItem[];
}