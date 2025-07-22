"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { AnimatePresence } from "framer-motion"

import { GalleryHeader } from "@/components/gallery-header"
import { BackButton } from "@/components/back-button"
import { GalleryImageCard } from "@/components/gallery-image-card"
import { ExpandedImageView } from "@/components/expanded-image-view"
import { getFolderById, type GalleryImage } from "@/app/page"

interface FolderPageProps {
  params: {
    folderId: string
  }
}

export default function FolderPage({ params }: FolderPageProps) {
  const folder = getFolderById(params.folderId)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  if (!folder) {
    notFound()
  }

  const handleImageClick = (image: GalleryImage) => {
    if (selectedImage && selectedImage.id === image.id) {
      setSelectedImage(null) // 이미 선택된 이미지를 다시 클릭하면 닫기
    } else {
      setSelectedImage(image)
    }
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <BackButton label="갤러리로 돌아가기" />
          <h1 className="text-2xl font-bold text-gray-900">{folder.name}</h1>
        </div>

        <AnimatePresence>
          {selectedImage && <ExpandedImageView image={selectedImage} folderName={folder.name} onClose={handleClose} />}
        </AnimatePresence>

        {folder.images.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p>이 폴더에는 아직 이미지가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {folder.images.map((image) => (
              <GalleryImageCard key={image.id} image={image} onClick={handleImageClick} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
