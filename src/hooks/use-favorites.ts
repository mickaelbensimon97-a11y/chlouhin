'use client'

import { useState, useEffect } from 'react'

interface FavoriteLocation {
  id: number
  beth_habad_name: string
  city: string
  country: string
  addedAt: string
}

const FAVORITES_KEY = 'chabad-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([])

  useEffect(() => {
    // Charger les favoris depuis localStorage
    const savedFavorites = localStorage.getItem(FAVORITES_KEY)
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Erreur lors du chargement des favoris:', error)
      }
    }
  }, [])

  const addToFavorites = (location: {
    id: number
    beth_habad_name: string
    city: string
    country: string
  }) => {
    const favorite: FavoriteLocation = {
      ...location,
      addedAt: new Date().toISOString()
    }

    const newFavorites = [...favorites, favorite]
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== id)
    setFavorites(newFavorites)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  }

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id)
  }

  const toggleFavorite = (location: {
    id: number
    beth_habad_name: string
    city: string
    country: string
  }) => {
    if (isFavorite(location.id)) {
      removeFromFavorites(location.id)
    } else {
      addToFavorites(location)
    }
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  }
}
