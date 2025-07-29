"use client"

import Link from "next/link"
import NextImage from "next/image"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {Folder} from "@/lib/app-util"

interface SidebarFolderItemProps {
    folder: Folder
    isCollapsed: boolean
    isActive: boolean
}

export function SidebarFolderItem({ folder, isCollapsed, isActive }: SidebarFolderItemProps) {
    const coverImage = getFolderCoverImage(folder)

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href={`/gallery/${folder.id}`}
                            className={cn(
                                "flex items-center justify-center h-10 w-full rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors",
                                isActive && "bg-slate-200 text-slate-900",
                            )}
                        >
                            <NextImage
                                src={coverImage}
                                alt={folder.name}
                                width={24}
                                height={24}
                                className="rounded object-cover w-6 h-6"
                            />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        <p>{folder.name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <Link
            href={`/gallery/${folder.id}`}
            className={cn(
                "flex items-center gap-3 pl-10 pr-3 py-2 text-sm font-medium rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                isActive && "bg-slate-200 text-slate-900",
            )}
        >
            <NextImage src={coverImage} alt={folder.name} width={20} height={20} className="rounded object-cover w-5 h-5" />
            <span className="truncate">{folder.name}</span>
        </Link>
    )
}
