"use client"

import { ImagePreview } from "@/components/image-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderIcon, ImageIcon } from "lucide-react"

interface FolderCardProps {
  name: string
  folderCount: number
  fileCount: number
  coverImage: string
}

export function FolderCard({ name, folderCount, fileCount, coverImage }: FolderCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <ImagePreview src={coverImage || "/placeholder.svg"} alt={`${name} 폴더 미리보기`} folderName={name} />
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {folderCount > 0 && (
              <Badge variant="secondary" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                <FolderIcon className="w-3 h-3 mr-1.5" />
                {folderCount}
              </Badge>
            )}
            {fileCount > 0 && (
              <Badge variant="secondary" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                <ImageIcon className="w-3 h-3 mr-1.5" />
                {fileCount}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{name}</h3>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            {folderCount > 0 && (
              <div className="flex items-center gap-1">
                <FolderIcon className="w-4 h-4" />
                <span>{folderCount}</span>
              </div>
            )}
            {fileCount > 0 && (
              <div className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                <span>{fileCount}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
