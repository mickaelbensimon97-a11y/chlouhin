'use client'

import { X, Phone, Mail, Globe, MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BethHabadLocation {
  id: number
  beth_habad_name: string
  city: string
  country: string
  phone: string | null
  website: string | null
  chabad_url: string | null
  location: string | null
}

interface SimpleModalProps {
  location: BethHabadLocation | null
  onClose: () => void
}

export function SimpleModal({ location, onClose }: SimpleModalProps) {
  if (!location) return null

  const handleCall = () => {
    if (location.phone) {
      window.open(`tel:${location.phone}`, '_self')
    }
  }

  const handleWebsite = () => {
    if (location.website) {
      window.open(location.website, '_blank')
    } else if (location.chabad_url) {
      window.open(location.chabad_url, '_blank')
    }
  }

  const handleDirections = () => {
    const query = `${location.beth_habad_name} ${location.city} ${location.country}`
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    window.open(url, '_blank')
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-[9999]">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-bold pr-8">{location.beth_habad_name}</h2>
          <p className="text-blue-100 text-sm">{location.city}, {location.country}</p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {location.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Adresse</p>
                <p className="text-sm text-gray-600">{location.location}</p>
              </div>
            </div>
          )}

          {location.phone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Téléphone</p>
                <p className="text-sm text-blue-600 cursor-pointer" onClick={handleCall}>
                  {location.phone}
                </p>
              </div>
            </div>
          )}

          {(location.website || location.chabad_url) && (
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Site web</p>
                <p className="text-sm text-blue-600 cursor-pointer" onClick={handleWebsite}>
                  Visiter le site
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            {location.phone && (
              <Button onClick={handleCall} className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </Button>
            )}
            
            <Button variant="outline" onClick={handleDirections} className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Itinéraire
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
