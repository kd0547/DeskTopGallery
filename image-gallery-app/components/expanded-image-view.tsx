"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GalleryImage } from "@/app/page"

interface ExpandedImageViewProps {
  image: GalleryImage
  onClose: () => void
}

export function ExpandedImageView({ image, onClose }: ExpandedImageViewProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative mb-8 w-full"
    >
      <div
        className="relative w-full bg-gray-100 rounded-lg overflow-hidden shadow-xl"
        style={{ aspectRatio: "auto", height: "80vh" }}
      >
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/75 hover:text-white rounded-full z-10"
      >
        <X className="w-5 h-5" />
      </Button>
    </motion.div>
  )
}
