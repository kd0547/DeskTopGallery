"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import Link from "next/link"

import { GalleryHeader } from "@/components/gallery-header"
import { GalleryImageCard } from "@/components/gallery-image-card"
import { FolderCard } from "@/components/folder-card"
import { ExpandedImageView } from "@/components/expanded-image-view"
import { Breadcrumb } from "@/components/breadcrumb"
import { findItemBySlug, type Image, type Folder } from "@/app/page"

interface FolderPageProps {
  params: {
    slug: string[]
  }
}

export default function NestedGalleryPage({ params }: FolderPageProps) {
  const currentFolder = findItemBySlug(params.slug)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  if (!currentFolder) {
    notFound()
  }

  const handleImageClick = (image: Image) => {
    setSelectedImage(selectedImage?.id === image.id ? null : image)
  }

  const breadcrumbPath = params.slug.map((segment, index) => {
    const href = `/gallery/${params.slug.slice(0, index + 1).join("/")}`
    const folder = findItemBySlug(params.slug.slice(0, index + 1))
    return { name: folder?.name || segment, href }
  })

  const getFolderCoverImage = (folder: Folder): string => {
    const firstImage = folder.items.find((item) => item.type === "image") as Image | undefined
    if (firstImage) return firstImage.src
    const subFolder = folder.items.find((item) => item.type === "folder") as Folder | undefined
    if (subFolder) return getFolderCoverImage(subFolder)
    return "/placeholder.svg?height=300&width=400"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GalleryHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Breadcrumb path={breadcrumbPath} />
        </div>

        <AnimatePresence>
          {selectedImage && <ExpandedImageView image={selectedImage} onClose={() => setSelectedImage(null)} />}
        </AnimatePresence>

        {currentFolder.items.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p>이 폴더는 비어 있습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentFolder.items.map((item) => {
              if (item.type === "folder") {
                const folderCount = item.items.filter((i) => i.type === "folder").length
                const fileCount = item.items.filter((i) => i.type === "image").length
                return (
                  <Link key={item.id} href={`/gallery/${[...params.slug, item.id].join("/")}`} className="block">
                    <FolderCard
                      name={item.name}
                      folderCount={folderCount}
                      fileCount={fileCount}
                      coverImage={getFolderCoverImage(item)}
                    />
                  </Link>
                )
              } else {
                return <GalleryImageCard key={item.id} image={item} onClick={handleImageClick} />
              }
            })}
          </div>
        )}
      </main>
    </div>
  )
}
