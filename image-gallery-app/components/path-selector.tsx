"use client"
import React from "react"

import { useRef, useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FolderOpen, FolderUp, HardDrive, Folder, ChevronRight } from "lucide-react"
import { open } from "@tauri-apps/plugin-dialog"

// 경로를 스타일링하는 새로운 내부 컴포넌트
const StyledPath = ({ path }: { path: string }) => {
    // Windows(\) 또는 Mac/Linux(/) 경로 구분자를 기준으로 경로를 나눕니다.
    const parts = path.split(/[\\/]/).filter((p) => p)

    return (
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-lg border border-slate-200 text-sm">
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-sm">
                        {index === 0 && part.includes(":") ? (
                            <HardDrive className="w-4 h-4 text-sky-600 flex-shrink-0" />
                        ) : (
                            <Folder className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        )}
                        <span className="font-medium text-slate-700 whitespace-nowrap">{part}</span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export function PathSelector({ rootFolderName }: { rootFolderName: string }) {
    const [currentPath, setCurrentPath] = useState(rootFolderName)
    useEffect(() => {
        setCurrentPath(rootFolderName)
    }, [rootFolderName])

    const handleIconClick = async () => {
        const folder = await open({
            directory:true,
            defaultPath:rootFolderName
        })
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            // 실제 앱에서는 여기서 선택된 파일/폴더를 처리하는 로직을 구현합니다.
            // 예: 파일 업로드, 목록 표시 등
            console.log("Selected items:", files)
            alert(`${files.length}개의 항목이 선택되었습니다.`)
        }
    }


    return (
        <div className="flex items-center gap-2">
            <StyledPath path={currentPath} />
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                        <FolderOpen className="w-5 h-5" />
                        <span className="sr-only">경로 변경</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">갤러리 경로</h4>
                            <p className="text-sm text-muted-foreground">갤러리의 기본 소스 폴더를 변경합니다.</p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <span className="col-span-1 text-sm font-medium">현재 경로</span>
                                <div className="col-span-2 h-8 flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm truncate">
                                    /{rootFolderName}
                                </div>
                            </div>
                            <Button variant="outline" onClick={handleIconClick} className="w-full justify-start bg-transparent">
                                <FolderUp className="mr-2 h-4 w-4" />
                                로컬 폴더 열기...
                            </Button>

                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}