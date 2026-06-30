'use client'

import L from 'leaflet'

// Créer une icône personnalisée pour les Beth Habad
export const createChabadIcon = (isSelected = false) => {
  const size = isSelected ? 40 : 32
  const iconHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      position: relative;
      ${isSelected ? 'transform: scale(1.1);' : ''}
      transition: all 0.2s ease;
    ">
      <div style="
        width: ${size * 0.6}px;
        height: ${size * 0.6}px;
        background: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="${size * 0.4}" height="${size * 0.4}" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#1e40af"/>
          <circle cx="12" cy="12" r="2" fill="#1e40af"/>
        </svg>
      </div>
      ${isSelected ? `
        <div style="
          position: absolute;
          top: -8px;
          right: -8px;
          width: 16px;
          height: 16px;
          background: #ef4444;
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        "></div>
      ` : ''}
    </div>
  `

  return L.divIcon({
    html: iconHtml,
    className: 'custom-chabad-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  })
}

// Créer une icône pour les clusters
export const createClusterIcon = (cluster: any) => {
  const count = cluster.getChildCount()
  let size = 40
  let className = 'cluster-small'
  
  if (count > 100) {
    size = 60
    className = 'cluster-large'
  } else if (count > 10) {
    size = 50
    className = 'cluster-medium'
  }

  const iconHtml = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      color: white;
      font-weight: bold;
      font-size: ${size * 0.3}px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      ${count}
    </div>
  `

  return L.divIcon({
    html: iconHtml,
    className: `custom-cluster-marker ${className}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  })
}
