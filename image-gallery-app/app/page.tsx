"use client"
import React,{useState,useEffect} from "react";

import Link from "next/link"
import { GalleryHeader } from "@/components/gallery-header"
import { FolderCard } from "@/components/folder-card"

export interface Image {
  type: "image"
  id: string
  src: string
  alt: string
}
export interface Folder {
  type: "folder"
  id: string
  name: string
  items: GalleryItem[]
}
export type GalleryItem = Folder | Image


const galleryData: Folder = {
  type: "folder",
  id: "root",
  name: "내 갤러리",
  items: [
    {
      type: "folder",
      id: "travel",
      name: "여행 사진",
      items: [
        {
          type: "folder",
          id: "europe",
          name: "유럽",
          items: [
            { type: "image", id: "europe-1", src: "/placeholder.svg?height=800&width=1200", alt: "파리 에펠탑" },
            { type: "image", id: "europe-2", src: "/placeholder.svg?height=900&width=1400", alt: "로마 콜로세움" },
          ],
        },
        {
          type: "folder",
          id: "asia",
          name: "아시아",
          items: [{ type: "image", id: "asia-1", src: "/placeholder.svg?height=1080&width=1920", alt: "도쿄 타워" }],
        },
        { type: "image", id: "travel-1", src: "/placeholder.svg?height=700&width=1000", alt: "제주도 해변" },
      ],
    },
    {
      type: "folder",
      id: "family",
      name: "가족 사진",
      items: [
        { type: "image", id: "family-1", src: "/placeholder.svg?height=600&width=800", alt: "가족 모임" },
        { type: "image", id: "family-2", src: "/placeholder.svg?height=700&width=700", alt: "아이들 사진" },
      ],
    },
    { type: "image", id: "main-1", src: "/placeholder.svg?height=500&width=800", alt: "메인 이미지" },
  ],
}

export default function GalleryPage() {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/Directory")
        .then(res => res.json())
        .then((data: Folder[]) => {
          setFolders(data); // 서버에서 받은 폴더 배열 구조에 맞춰 저장
        })
        .catch(err => {
          console.error("데이터 불러오기 실패:", err);
        });
  }, []);

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">내 갤러리</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {folders.map((item) => {
            if (item.type === "folder") {
              const folderCount = item.items.filter((i) => i.type === "folder").length
              const fileCount = item.items.filter((i) => i.type === "image").length
              return (
                <Link key={item.id} href={`/gallery/${item.id}`} className="block">
                  <FolderCard
                    name={item.name}
                    folderCount={folderCount}
                    fileCount={fileCount}
                    coverImage={getFolderCoverImage(item)}
                  />
                </Link>
              )
            }
            return null
          })}
        </div>
      </main>
    </div>
  )
}
