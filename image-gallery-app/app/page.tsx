"use client"
import React,{useState,useEffect} from "react";
import { invoke } from '@tauri-apps/api/core'

import Link from "next/link"
import { GalleryHeader } from "@/components/gallery-header"
import { FolderCard } from "@/components/folder-card"
import {PathSelector} from "@/components/path-selector"
import { EmptyState } from "@/components/empty-state"
import {Sidebar} from "@/components/sidebar";
import {FavoritesProvider} from "@/contexts/favorites-contexts";
import {Folder,Image,GalleryItem} from "@/lib/app-util"


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
      invoke<Folder | null>("get_directory",{ path: dir })
          .then(res => {
              if (!res) return []
              console.log(res)

              const foldersOnly = res.items.filter(
                  (item): item is Folder => item.types === "folder"
              )
              console.log(foldersOnly)

              setFolders(foldersOnly);
              //return folders; // 혹시 then 체이닝할 때 쓰려고
          })
          .catch(err => {
              console.error("데이터 불러오기 실패:", err);
          });

  }, [dir]);

  const getFolderCoverImage = (folder: Folder): string => {
    const firstImage = folder.items.find((item) => item.types === "image") as Image | undefined
    if (firstImage) return firstImage.src
    const subFolder = folder.items.find((item) => item.types === "folder") as Folder | undefined
    if (subFolder) return getFolderCoverImage(subFolder)
    return "/placeholder.svg?height=300&width=400"
  }





  return (
      <FavoritesProvider>
          <div className="flex min-h-screen bg-slate-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                  <GalleryHeader />
                  <main className="container mx-auto px-4 py-6">
                      <div className="mb-6">
                          <PathSelector rootFolderName={dir??"C:\\"} />
                      </div>

                      {folders.length === 0 ? (
                          <EmptyState />
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {folders.map((item) => {
                                  if (item.types === "folder") {
                                      const folderCount = item.items.filter((i) => i.types === "folder").length
                                      const fileCount = item.items.filter((i) => i.types === "image").length

                                      return (
                                          <Link key={item.id} href={`/gallery/${item.id}`} className="block">
                                              <FolderCard
                                                  id={item.id}
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
          </div>
      </FavoritesProvider>
  )
}
