"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FolderOpen, FolderUp } from "lucide-react"

export function PathSelector({ rootFolderName }: { rootFolderName: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleIconClick = () => {
        fileInputRef.current?.click()
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
            <h1 className="text-2xl font-bold text-gray-900">{rootFolderName}</h1>
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
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                // @ts-ignore - for cross-browser compatibility
                                webkitdirectory="true"
                                mozdirectory="true"
                                directory="true"
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}