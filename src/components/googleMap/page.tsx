import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';

interface GoogleMapCompProps {
    // Define your props here
}
const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 49.2138,
    lng: -2.13125
};

const GoogleMapComp: React.FC<GoogleMapCompProps> = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0"
    })

    const [zoom, setZoom] = useState(15);
    const mapRef = useRef<any>(null);

    const [map, setMap] = React.useState(null)
    const [markerLocation, setMarkerLocation] = useState(center)
    const [selectedPlace, setSelectedPlace] = useState<any>({})

    // const onLoad = React.useCallback(function callback(map: any) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    //     map.setZoom(10)
    //     setMap(map)
    // }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    const onMapClick = (e: any) => {
        setMarkerLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
    }

    const handleMarkerClick = (place: any) => {
        setSelectedPlace(place);
    };

    const handleInfoWindowClose = () => {
        setSelectedPlace(null);
    };

    const handleZoomChanged = () => {
        // Update the zoom state when the zoom level changes
        if (mapRef.current) {
            setZoom(mapRef.current.getZoom());
        }
    };

    const markerClick=(e:any)=>{
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkk" , e)

    }


    return (
        isLoaded && <GoogleMap
            // mapContainerStyle={containerStyle}
            center={center}
            mapContainerClassName='googleMap'
            onLoad={(map) => {
                mapRef.current = map;
                handleZoomChanged();
            }}
            zoom={zoom}
            onZoomChanged={handleZoomChanged} 
            onUnmount={onUnmount}
            // onClick={onMapClick}
        >
            <Marker position={markerLocation}  onClick={markerClick}/>
            { /* Child components, such as markers, info windows, etc. */}
            {/* {selectedPlace && ( */}
                {/* <InfoWindow
                    position={center}
                >
                   
                </InfoWindow> */}
            {/* )} */}
            <></>
        </GoogleMap>
    );
};

export default GoogleMapComp;