"use client"
import { useFavorites } from "@/contexts/favorites-contexts"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ImagePreview } from "@/components/image-preview"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FolderIcon, ImageIcon, FolderOpen, Star, Edit, Info, Trash2, Share2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface FolderCardProps {
  id : string
  name: string
  folderCount: number
  fileCount: number
  coverImage: string
}

export function FolderCard({ id,name, folderCount, fileCount, coverImage }: FolderCardProps) {
  const {addFavorite,removeFavorite,isFavorite }= useFavorites();
  const isFav = isFavorite(id);

  const handleFavoriteToggle = () => {
    if(isFav) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <ImagePreview src={coverImage || "/placeholder.svg"} alt={`${name} 폴더 미리보기`} folderName={name} />
                <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                  {folderCount > 0 && (
                      <Badge variant="secondary" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                        <FolderIcon className="w-3 h-3 mr-1.5" />
                        {folderCount} 폴더
                      </Badge>
                  )}
                  {fileCount > 0 && (
                      <Badge variant="secondary" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                        <ImageIcon className="w-3 h-3 mr-1.5" />
                        {fileCount} 파일
                      </Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{name}</h3>
                  <Star
                      className={cn(
                          "w-5 h-5 text-gray-300 transition-all group-hover:text-yellow-400",
                          isFav && "text-yellow-400 fill-yellow-400",
                      )}
                  />
                </div>
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
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>열기</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>새 탭에서 열기</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleFavoriteToggle}>
            <Star className="mr-2 h-4 w-4" />
            <span>{isFav ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <Share2 className="mr-2 h-4 w-4" />
            <span>공유</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>이름 바꾸기</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <Info className="mr-2 h-4 w-4" />
            <span>정보 가져오기</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>삭제</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
  )
}
