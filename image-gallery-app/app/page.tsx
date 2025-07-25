"use client"
import React,{useState,useEffect} from "react";
import { invoke } from '@tauri-apps/api/core'

import Link from "next/link"
import { GalleryHeader } from "@/components/gallery-header"
import { FolderCard } from "@/components/folder-card"
import {PathSelector} from "@/components/path-selector"
import { EmptyState } from "@/components/empty-state"

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

export interface DirInfo {
    directory: string[];
    file_path: string[];
}

export default function GalleryPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [rootFolderName,setRootFolderName] = useState<string>("루트 디렉토리");
  const [dir, setDir] = useState<string | null>(null)
    useEffect(() => {
        invoke<string | null>("get_user_directory")
            .then((data)=> {
                console.log(data)
                if (data !== null) {
                    setDir(data)
                } else {
                    // null일 때 처리
                    setDir("C:\\")   // 또는 setDir("알 수 없음") 등
                }
            })
            .catch(console.error)
    }, [])


  useEffect(() => {
      if(!dir) return;
      console.log("TEST"+dir);
      invoke<DirInfo | null>("get_directory",{ path: dir })
          .then(res => {
              if (!res) return [];

              console.log(res);
              // 예: 폴더 이름 중 첫번째를 루트로
              //setRootFolderName(folders[0]?.name || "");
              //setFolders(folders);
              //return folders; // 혹시 then 체이닝할 때 쓰려고
          })
          .catch(err => {
              console.error("데이터 불러오기 실패:", err);
          });

  }, [dir]);

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
          <PathSelector rootFolderName={dir??"C:\\"} />
        </div>

        {folders.length === 0 ? (
            <EmptyState />
        ) : (
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
        )
        }
      </main>
    </div>
  )
}
