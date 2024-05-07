import { useMyContext } from "@/app/Context/MyContext";
import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";

import React, { useEffect, useRef, useState } from "react";

interface GoogleMapCompProps {
    // Define your props here
}
const containerStyle = {
    width: "400px",
    height: "400px",
};

const center = {
    lat: 49.2138,
    lng: -2.13125,
};

const GoogleMapComp: React.FC<GoogleMapCompProps> = (props) => {
    const { dataDetails ,modalName } = useMyContext();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0",
    });

    const [selectedLat, setSelectedLat] = useState<number>(49.2138);
    const [selectedLong, setSelectedLong] = useState<number>(-2.13125);
    const [zoom, setZoom] = useState(15);
    const mapRef = useRef<any>(null);

    const [map, setMap] = React.useState(null);
    const [markerLocation, setMarkerLocation] = useState(center);
    const [selectedPlace, setSelectedPlace] = useState<any>({});
    useEffect(() => {
        // if (window.location.pathname.includes("categories")) {
            setSelectedLat(
                dataDetails?.acf?.map_location_lat
                    ? +dataDetails?.acf?.map_location_lat
                    : 49.2138
            );
            setSelectedLong(

                dataDetails?.acf?.map_location_lng
                    ? +dataDetails?.acf?.map_location_lng
                    : -2.13125
            );
        // }
    }, [(dataDetails?.acf?.map_location_lat ) , (dataDetails?.acf?.map_location_lng )]);

    useEffect(() => {
        setSelectedLat(49.2138);
        setSelectedLong(-2.13125);
    }, [window.location.pathname]);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);

    const onMapClick = (e: any) => {
        setMarkerLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };

    const handleMarkerClick = (place: any) => {
        setSelectedPlace(place);
    };

    const handleInfoWindowClose = () => {
        setSelectedPlace(null);
    };

    const handleZoomChanged = () => {
        if (mapRef.current) {
            setZoom(mapRef.current.getZoom());
        }
    };

    const markerClick = (e: any) => { };
    const handleClick = async (e: any) => {
        // console.log("martkier", e)
        // const response = await fetch("https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJPdcAX96sDUgROOBQVMLy6_A&key=AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0")
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJPdcAX96sDUgROOBQVMLy6_A&key=AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0`
        );
        // console.log("response" , response)
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
    };
    const mapLocation = {
        lat: selectedLat,
        lng: selectedLong,
    };

    return (
        isLoaded && (
            <GoogleMap
                center={mapLocation}
                onClick={(e: any) => handleClick(e)}
                mapContainerClassName="googleMap"
                onLoad={(map) => {
                    mapRef.current = map;
                    handleZoomChanged();
                }}
                zoom={zoom}
                onZoomChanged={handleZoomChanged}
                onUnmount={onUnmount}
                options={{
                    mapTypeControl: false, 
                    zoomControl: window.innerWidth >= 800 ? true : false, 
                    fullscreenControl : window.innerWidth >= 800 ? true : false,
                }}
                

            // onClick={onMapClick}
            >
                <Marker position={mapLocation} onClick={markerClick} />
                {/* Child components, such as markers, info windows, etc. */}
                {/* {selectedPlace && ( */}
                {/* <InfoWindow
                    position={center}
                >
                   
                </InfoWindow> */}
                {/* )} */}
                <></>
            </GoogleMap>
        )
    );
};

export default GoogleMapComp;
