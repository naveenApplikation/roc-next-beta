import { useMyContext } from "@/app/Context/MyContext";
import fallback from "../../../assets/images/fallbackimage.png";
import { TiInfo } from "react-icons/ti";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface GoogleMapCompProps {
  // Define your props here
}
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 49.1811261,
  lng: -2.1051429,
};

const ApiKey: string | any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const GoogleMapComp: React.FC<GoogleMapCompProps> = (props) => {
  const { dataDetails, modalName, modalClick, location } = useMyContext();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: process.env.GOOGLE_API_KEY,
    googleMapsApiKey: ApiKey,
  });

  const [selectedLat, setSelectedLat] = useState<number>(49.1811261);
  const [selectedLong, setSelectedLong] = useState<number>(2.1051429);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef<any>(null);

  const [map, setMap] = React.useState(null);
  const [markerLocation, setMarkerLocation] = useState(center);
  const [selectedPlace, setSelectedPlace] = useState<any>({});
  const [userLocation, setUserLocation] = useState(null);

  // const jerseyBounds = new window.google.maps.LatLngBounds(
  //     new window.google.maps.LatLng(49.1692, -2.2666),
  //     new window.google.maps.LatLng(49.2668, -2.0116)
  // );

  // const checkIfInsideJersey = (location: any) => {
  //     return jerseyBounds.contains(new window.google.maps.LatLng(location.lat, location.lng));
  // };

  // useEffect(() => {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //                 const { latitude, longitude } = position.coords;
  //                 const userLoc: any = { lat: latitude, lng: longitude };
  //                 const insideJersey = checkIfInsideJersey(userLoc);
  //                 if(insideJersey){
  //                     setUserLocation(userLoc);
  //                 } else {
  //                     toast.error('User is outside Jersey')
  //                 }
  //             },
  //             (error) => {
  //                 console.error('Error getting user location:', error);
  //             }
  //         );
  //     }
  // }, []);
  const handleMapLoad = useCallback((map: any) => {
    mapRef.current = map;

    // Define Jersey Island boundaries
    const jerseyBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(49.1692, -2.2666),
      new window.google.maps.LatLng(49.2668, -2.0116)
    );

    const checkIfInsideJersey = (location: any) => {
      return jerseyBounds.contains(
        new window.google.maps.LatLng(location.lat, location.lng)
      );
    };

    if (navigator.geolocation) {
      const savedLocation = sessionStorage.getItem("userLocation");
      if (savedLocation) {
        const { latitude, longitude } = JSON.parse(savedLocation);
        const userLoc: any = { lat: latitude, lng: longitude };
        // setUserLocation(userLoc);
        const insideJersey = checkIfInsideJersey(userLoc);
        console.log("User is inside Jersey:", insideJersey);
        if (insideJersey) {
          setUserLocation(userLoc);
        } else {
        }
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLoc: any = { lat: latitude, lng: longitude };
            // setUserLocation(userLoc);
            const insideJersey = checkIfInsideJersey(userLoc);
            console.log("User is inside Jersey:", insideJersey);
            if (insideJersey) {
              setUserLocation(userLoc);
            } else {
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    // if (window.location.pathname.includes("categories")) {
    console.log(
      "googlegooglegooglegooglegoogle",
      dataDetails?.geometry,
      location
    );
    setSelectedLat(
      dataDetails?.data_type === "google"
        ? dataDetails?.geometry?.location?.lat
        : dataDetails?.acf?.map_location.lat
        ? +dataDetails?.acf?.map_location.lat
        : 49.1811261
    );
    setSelectedLong(
      dataDetails?.data_type === "google"
        ? dataDetails?.geometry?.location?.lng
        : dataDetails?.acf?.map_location?.lng
        ? +dataDetails?.acf?.map_location?.lng
        : -2.1051429
    );
    // }
  }, [
    dataDetails?.acf?.map_location?.lat,
    dataDetails?.acf?.map_location?.lng,
    dataDetails?.geometry?.location?.lat,
    dataDetails?.geometry?.location?.lng,
  ]);

  useEffect(() => {
    setSelectedLat(49.1811261);
    setSelectedLong(-2.1051429);
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

  const markerClick = (e: any) => {
    // console.log("data of map", e)
  };
  const handleClick = async (e: any) => {
    const data = {
      data_type: "google",
      place_id: e.placeId,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    modalClick("ModalContent", data, fallback);
    return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJPdcAX96sDUgROOBQVMLy6_A&key=${ApiKey}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("error", error);
    }
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
          handleMapLoad(map);
        }}
        zoom={zoom}
        // onZoomChanged={handleZoomChanged}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          zoomControl: window.innerWidth >= 800 ? true : false,
          fullscreenControl: window.innerWidth >= 800 ? true : false,
        }}

        // onClick={onMapClick}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            onClick={() => handleMarkerClick(userLocation)}
          />
        )}
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
