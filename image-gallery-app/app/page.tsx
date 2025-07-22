import Link from "next/link"
import { GalleryHeader } from "@/components/gallery-header"
import { FolderCard } from "@/components/folder-card"

// 샘플 갤러리 데이터 (이미지 배열 추가)
const galleryFolders: { id: any; name: any; imageCount: number; coverImage: string; lastModified: string; images: { id: string; src: string; alt: string }[] }[] = []

async function GetGallery() {
  fetch('http://localhost:3001/directory')
      .then(response => response.json())
      .then(data => {

        data.forEach((filename: any) => {

          galleryFolders.push({
            id: filename,
            name: filename,
            imageCount: 24,
            coverImage: "/placeholder.svg?height=400&width=600",
            lastModified: "2024-01-15",
            images: [
              { id: "travel-1", src: "/placeholder.svg?height=800&width=1200", alt: "여행 사진 1" },
              { id: "travel-2", src: "/placeholder.svg?height=900&width=1600", alt: "여행 사진 2" },
              { id: "travel-3", src: "/placeholder.svg?height=1000&width=1500", alt: "여행 사진 3" },
              { id: "travel-4", src: "/placeholder.svg?height=700&width=1000", alt: "여행 사진 4" },
            ],
          },)
        })

      })
      .catch(err => console.error('에러 발생:',err))
}


export default function GalleryPage() {
  GetGallery().then()
  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">내 갤러리</h1>
          <p className="text-gray-600">
            총 {galleryFolders.length}개 폴더, {galleryFolders.reduce((sum, folder) => sum + folder.imageCount, 0)}장의
            사진
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryFolders.map((folder) => (
            <Link key={folder.id} href={`/gallery/${folder.id}`} className="block">
              <FolderCard folder={folder} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

// 이 데이터를 다른 페이지에서도 사용할 수 있도록 내보냅니다.
export type GalleryFolder = (typeof galleryFolders)[0]
export type GalleryImage = (typeof galleryFolders)[0]["images"][0]

export const getGalleryFolders = () => galleryFolders
export const getFolderById = (id: string) => galleryFolders.find((folder) => folder.id === id)
export const getImageById = (folderId: string, imageId: string) => {
  const folder = getFolderById(folderId)
  return folder?.images.find((image) => image.id === imageId)
}
