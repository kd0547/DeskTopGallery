"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  label?: string
}

export function BackButton({ label = "뒤로가기" }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </Button>
  )
}
