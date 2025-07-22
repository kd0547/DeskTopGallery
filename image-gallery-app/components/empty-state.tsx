import type React from "react"
import { FolderSearch } from "lucide-react"

interface EmptyStateProps {
    title?: string
    description?: string
    action?: React.ReactNode
}

export function EmptyState({
                               title = "갤러리가 비어있습니다",
                               description = "새로운 폴더를 추가하거나 로컬 폴더를 열어 사진을 가져오세요.",
                               action,
                           }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200">
            <div className="mx-auto w-fit bg-slate-100 p-4 rounded-full">
                <FolderSearch className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-800">{title}</h2>
            <p className="mt-2 text-slate-500">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}
