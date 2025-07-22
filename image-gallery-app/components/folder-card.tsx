"use client"

import { ImagePreview } from "@/components/image-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ImageIcon } from "lucide-react"
import type { GalleryFolder } from "@/app/page" // GalleryFolder 타입 가져오기

interface FolderCardProps {
  folder: GalleryFolder
}

export function FolderCard({ folder }: FolderCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* 이미지 미리보기 */}
        <div className="relative">
          <ImagePreview
            src={folder.coverImage || "/placeholder.svg"}
            alt={`${folder.name} 폴더 미리보기`}
            folderName={folder.name}
          />

          {/* 이미지 개수 배지 */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white border-0">
              <ImageIcon className="w-3 h-3 mr-1" />
              {folder.imageCount}
            </Badge>
          </div>
        </div>

        {/* 폴더 정보 */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {folder.name}
          </h3>

          <div className="flex items-center text-sm text-gray-500 gap-4">
            <div className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              <span>{folder.imageCount}장</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(folder.lastModified)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
