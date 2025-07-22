"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageIcon } from "lucide-react"
import type { GalleryImage } from "@/app/page"

interface GalleryImageCardProps {
  image: GalleryImage
  onClick: (image: GalleryImage) => void
}

export function GalleryImageCard({ image, onClick }: GalleryImageCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const fixedHeight = 250

  if (imageError) {
    return (
      <div
        className="w-full bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg"
        style={{ height: `${fixedHeight}px` }}
      >
        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center px-4">
          <span className="text-xs">이미지를 불러올 수 없습니다</span>
        </p>
      </div>
    )
  }

  return (
    <button onClick={() => onClick(image)} className="block group w-full text-left">
      <div
        className="relative w-full overflow-hidden bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        style={{ height: `${fixedHeight}px` }}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className={`object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>
    </button>
  )
}
