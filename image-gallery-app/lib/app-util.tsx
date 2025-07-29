export interface Image {
    types: "image"
    id: string
    src: string
    alt: string
}
export interface Folder {
    types: "folder"
    id: string
    name: string
    current: String
    items: GalleryItem[]
}
export type GalleryItem = Folder | Image