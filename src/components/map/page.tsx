import React, { Suspense, lazy } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png"

interface LeafletMapProps {
  // Define your props here
  showMap: boolean;
}

const LeafletMap = lazy(() => import('react-leaflet' as any));




const LeafletMaps: React.FC<LeafletMapProps> = (props) => {
  const position: any = [22.7196, 75.8577]
  return (

    typeof window !== 'undefined' && (
       <Suspense fallback={<div>Loading...</div>}>
        <MapContainer center={position} zoom={13} >

          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}
            icon={
              L.icon({
                iconUrl: MarkerIcon.src
              })
            }

          >
            <Tooltip>Tooltip for Marker</Tooltip>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Suspense>)
  )
};

export default LeafletMaps;