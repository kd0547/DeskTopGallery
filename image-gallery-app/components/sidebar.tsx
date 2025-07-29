"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Clock, Trash2, Settings, ChevronsLeft, Star, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useFavorites } from "@/contexts/favorites-contexts"
import { SidebarFolderItem } from "./sidebar-folder-item"

const navItems = [
    { href: "/", label: "내 갤러리", icon: Home },
    { href: "/recents", label: "최근 항목", icon: Clock },
    { href: "/trash", label: "휴지통", icon: Trash2 },
]

export function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { favorites } = useFavorites()

    const favoriteFolders = favorites
        .map((id) => findFolderById(galleryData, id))
        .filter((folder): folder is FolderType => folder !== null)

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <TooltipProvider delayDuration={0}>
            <aside
                className={cn(
                    "flex-shrink-0 bg-white border-r border-slate-200 p-2 flex flex-col transition-[width] duration-300 ease-in-out",
                    isCollapsed ? "w-20" : "w-60",
                )}
            >
                <div className="mb-6 flex items-center justify-end p-2">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <ChevronsLeft className={cn("w-5 h-5 transition-transform", isCollapsed && "rotate-180")} />
                    </Button>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) =>
                        isCollapsed ? (
                            <Tooltip key={item.label}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-center h-10 w-full rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors",
                                            pathname === item.href && "bg-slate-100 text-slate-900",
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors",
                                    pathname === item.href && "bg-slate-100 text-slate-900",
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        ),
                    )}

                    {/* 즐겨찾기 섹션 */}
                    <Collapsible defaultOpen>
                        <CollapsibleTrigger className={cn("w-full", isCollapsed && "flex justify-center")}>
                            {isCollapsed ? (
                                <div className="flex items-center justify-center h-10 w-full rounded-md text-slate-600">
                                    <Star className="w-5 h-5" />
                                </div>
                            ) : (
                                <div
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 w-full",
                                    )}
                                >
                                    <Star className="w-4 h-4" />
                                    <span>즐겨찾기</span>
                                    <ChevronDown className="w-4 h-4 ml-auto transition-transform [&[data-state=open]]:rotate-180" />
                                </div>
                            )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-1 space-y-1 data-[state=closed]:hidden">
                            {favoriteFolders.length > 0
                                ? favoriteFolders.map((folder) => (
                                    <SidebarFolderItem
                                        key={folder.id}
                                        folder={folder}
                                        isCollapsed={isCollapsed}
                                        isActive={pathname.includes(folder.id)}
                                    />
                                ))
                                : !isCollapsed && <p className="px-3 py-2 text-xs text-slate-400 text-center">즐겨찾기 없음</p>}
                        </CollapsibleContent>
                    </Collapsible>
                </nav>

                <div className="mt-auto">
                    {isCollapsed ? (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/settings"
                                    className={cn(
                                        "flex items-center justify-center h-10 w-full rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors",
                                        pathname === "/settings" && "bg-slate-100 text-slate-900",
                                    )}
                                >
                                    <Settings className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                <p>설정</p>
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            href="/settings"
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors",
                                pathname === "/settings" && "bg-slate-100 text-slate-900",
                            )}
                        >
                            <Settings className="w-4 h-4" />
                            설정
                        </Link>
                    )}
                </div>
            </aside>
        </TooltipProvider>
    )
}
