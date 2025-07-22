import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  path: { name: string; href: string }[]
}

export function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link href="/" className="hover:text-blue-600">
        갤러리
      </Link>
      {path.map((p, index) => (
        <div key={p.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1" />
          {index === path.length - 1 ? (
            <span className="font-semibold text-gray-700">{p.name}</span>
          ) : (
            <Link href={p.href} className="hover:text-blue-600">
              {p.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
