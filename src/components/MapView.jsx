import { useMemo } from 'react'
import { MapContainer, TileLayer, ZoomControl, Marker } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const TEL_AVIV_CENTER = [32.0853, 34.7818]
const DEFAULT_ZOOM = 13

// Builds a custom SVG divIcon for each activity.
//
// Shadow is applied via CSS filter on the SVG element (not an SVG <filter>)
// to avoid the shared-ID conflict that occurs when multiple inline SVGs
// in the same DOM declare the same filter id="…".
//
// iconAnchor [24, 57] positions the needle tip exactly over the coordinate.
function createPinIcon(emoji, color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="48" height="58" viewBox="0 0 48 58"
         style="overflow:visible">
      <!-- Body -->
      <rect x="2" y="2" width="44" height="44" rx="20" fill="${color}"/>
      <!-- Inner highlight ring for depth -->
      <rect x="2" y="2" width="44" height="44" rx="20"
            fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5"/>
      <!-- Needle -->
      <path d="M18 46 L24 57 L30 46 Z" fill="${color}"/>
      <!-- Emoji centered in body -->
      <text x="24" y="24"
            text-anchor="middle" dominant-baseline="central"
            font-size="22"
            font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,Android Emoji,sans-serif">
        ${emoji}
      </text>
    </svg>`

  return divIcon({
    html: svg,
    className: 'chugmap-pin',   // styled in index.css
    iconSize:   [48, 58],
    iconAnchor: [24, 57],       // needle tip → sits exactly on the coordinate
    popupAnchor:[0, -57],
  })
}

export default function MapView({ activities, onSelectActivity, lang }) {
  // Memoised so Leaflet doesn't rebuild marker DOM on unrelated re-renders.
  // activities is a module-level constant so this runs once per mount.
  const icons = useMemo(
    () => Object.fromEntries(
      activities.map(a => [a.id, createPinIcon(a.emoji, a.color)])
    ),
    [activities],
  )

  return (
    <div className="flex-1 min-h-0">
      <MapContainer
        center={TEL_AVIV_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={10}
        maxZoom={19}
        scrollWheelZoom
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
          keepBuffer={4}
        />

        {activities.map(activity => (
          <Marker
            key={activity.id}
            position={activity.coords}
            icon={icons[activity.id]}
            eventHandlers={{ click: () => onSelectActivity(activity) }}
          />
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}
