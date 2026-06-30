export interface BethHabadLocation {
  id: number
  external_id: string
  beth_habad_name: string
  city: string
  country: string
  latitude: number | null
  longitude: number | null
  phone: string | null
  website: string | null
  chabad_url: string | null
  description: string | null
  location: string | null
  // Propriétés étendues
  state?: string
  address?: string
  postal_code?: string
  email?: string
  rabbi?: string
  opening_hours?: string
}
