import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png"

interface LeafletMapProps {
    // Define your props here
    showMap:boolean;
}

const LeafletMap: React.FC<LeafletMapProps> = (props) => {
    const position:any = [22.7196, 75.8577]
    return (
        <MapContainer center={position} zoom={13} >

            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}
            icon={
              L.icon({
                iconUrl:MarkerIcon.src
              })
            }
      
            >
              <Tooltip>Tooltip for Marker</Tooltip>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
    )
};

export default LeafletMap;