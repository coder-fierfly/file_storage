export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'image' | 'zip';
    children?: FileItem[];
}