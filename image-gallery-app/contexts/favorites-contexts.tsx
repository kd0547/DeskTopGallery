"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FavoritesContextType {
    favorites: string[]
    addFavorite: (folderId: string) => void
    removeFavorite: (folderId: string) => void
    isFavorite: (folderId: string) => boolean
}

const FavoritesContexts = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([])

    useEffect(() => {
        // 컴포넌트가 마운트될 때 localStorage에서 즐겨찾기 목록을 불러옵니다.
        const storedFavorites = localStorage.getItem("galleryFavorites")
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        }
    }, [])

    const updateLocalStorage = (newFavorites: string[]) => {
        setFavorites(newFavorites)
        localStorage.setItem("galleryFavorites", JSON.stringify(newFavorites))
    }

    const addFavorite = (folderId: string) => {
        if (!favorites.includes(folderId)) {
            updateLocalStorage([...favorites, folderId])
        }
    }

    const removeFavorite = (folderId: string) => {
        updateLocalStorage(favorites.filter((id) => id !== folderId))
    }

    const isFavorite = (folderId: string) => {
        return favorites.includes(folderId)
    }

    return (
        <FavoritesContexts.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContexts.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContexts)
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider")
    }
    return context
}
