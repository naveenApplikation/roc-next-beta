
// // import {
// //     GoogleMap,
// //     Marker,
// //     useJsApiLoader,
// // } from "@react-google-maps/api";

// // import React, { useCallback, useEffect, useRef, useState } from "react";


// // interface GoogleMapCompProps {
// //     // Define your props here
// // }
// // const containerStyle = {
// //     width: "100%",
// //     height: "50%",
// // };

// // const center = {
// //     lat: 49.1811261,
// //     lng: -2.1051429,
// // };

// // const DirectionMapUi: React.FC<GoogleMapCompProps> = (props) => {
// //     const { isLoaded } = useJsApiLoader({
// //         id: "google-map-script",
// //         googleMapsApiKey: "AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0",
// //     });

// //     const [selectedLat, setSelectedLat] = useState<number>(49.1811261);
// //     const [selectedLong, setSelectedLong] = useState<number>(2.1051429);
// //     const [zoom, setZoom] = useState(15);
// //     const mapRef = useRef<any>(null);

// //     const [map, setMap] = React.useState(null);
// //     const [markerLocation, setMarkerLocation] = useState(center);
// //     const [selectedPlace, setSelectedPlace] = useState<any>({});
// //     const [userLocation, setUserLocation] = useState(null);


// //     const handleMapLoad = useCallback((map: any) => {
// //         mapRef.current = map;




// //         if (navigator.geolocation) {
// //             navigator.geolocation.getCurrentPosition(
// //                 (position) => {
// //                     const { latitude, longitude } = position.coords;
// //                     const userLoc: any = { lat: latitude, lng: longitude };
// //                         setUserLocation(userLoc);
// //                 },
// //                 (error) => {
// //                     console.error('Error getting user location:', error);
// //                 }
// //             );
// //         }
// //     }, []);



// //     useEffect(() => {
// //         setSelectedLat(49.1811261);
// //         setSelectedLong(-2.1051429);
// //     }, [window.location.pathname]);

// //     const onUnmount = React.useCallback(function callback(map: any) {
// //         setMap(null);
// //     }, []);

// //     const onMapClick = (e: any) => {
// //         setMarkerLocation({
// //             lat: e.latLng.lat(),
// //             lng: e.latLng.lng(),
// //         });
// //     };

// //     const handleMarkerClick = (place: any) => {
// //         setSelectedPlace(place);
// //     };


// //     const handleZoomChanged = () => {
// //         if (mapRef.current) {
// //             setZoom(mapRef.current.getZoom());
// //         }
// //     };

// //     const markerClick = (e: any) => {
// //         // console.log("data of map", e)

// //     };
// //     const handleClick = async (e: any) => {
// //         const data = {
// //             data_type: "google",
// //             place_id: e.placeId
// //         }

// //     };
// //     const mapLocation = {
// //         lat: selectedLat,
// //         lng: selectedLong,
// //     };

// //     return (
// //         isLoaded && (
// //             <GoogleMap
// //                 center={mapLocation}
// //                 mapContainerStyle={containerStyle}
// //                 onClick={(e: any) => handleClick(e)}
// //                 mapContainerClassName="googleMap"
// //                 onLoad={(map) => {
// //                     mapRef.current = map;
// //                     handleZoomChanged();
// //                     handleMapLoad(map);
// //                 }}
// //                 zoom={zoom}
// //                 onZoomChanged={handleZoomChanged}
// //                 onUnmount={onUnmount}
// //                 options={{
// //                     mapTypeControl: false,
// //                     zoomControl: window.innerWidth >= 800 ? true : false,
// //                     fullscreenControl: window.innerWidth >= 800 ? true : false,
// //                 }}
// //             >
// //                 {userLocation && (
// //                     <Marker
// //                         position={userLocation}
// //                         onClick={() => handleMarkerClick(userLocation)}
// //                     />
// //                 )}

// //             </GoogleMap>
// //         )
// //     );
// // };

// // export default DirectionMapUi;



// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//     DirectionsRenderer,
//     GoogleMap,
//     Marker,
//     useJsApiLoader,
// } from "@react-google-maps/api";
// import { useMyContext } from "@/app/Context/MyContext";

// interface GoogleMapCompProps { }

// const containerStyle = {
//     width: "100%",
//     height: "50%",
// };

// const center = {
//     lat: 49.1811261,
//     lng: -2.1051429,
// };

// const DirectionMapUi: React.FC<GoogleMapCompProps> = (props) => {
//     const { isLoaded } = useJsApiLoader({
//         id: "google-map-script",
//         googleMapsApiKey: "AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0",
//     });

//     const { location } = useMyContext();
//     const [selectedLat, setSelectedLat] = useState<number>(49.1811261);
//     const [selectedLong, setSelectedLong] = useState<number>(-2.1051429);
//     const [zoom, setZoom] = useState(15);
//     const mapRef = useRef<any>(null);
//     const [map, setMap] = React.useState(null);
//     const [markerLocation, setMarkerLocation] = useState(center);
//     const [selectedPlace, setSelectedPlace] = useState<any>({});
//     const [userLocation, setUserLocation] = useState(null);
//     const [directions, setDirections] = useState<any>(null);
//     const [directionsRenderer, setDirectionsRenderer] = useState(null);

//     const handleMapLoad = useCallback((map: any) => {
//         mapRef.current = map;
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     const userLoc: any = { lat: latitude, lng: longitude };
//                     setUserLocation(userLoc);
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                 }
//             );
//         }
//     }, []);

//     useEffect(() => {
//         setSelectedLat(49.1811261);
//         setSelectedLong(-2.1051429);
//     }, [window.location.pathname]);

//     const onUnmount = React.useCallback(function callback(map: any) {
//         setMap(null);
//     }, []);

//     const onMapClick = (e: any) => {
//         setMarkerLocation({
//             lat: e.latLng.lat(),
//             lng: e.latLng.lng(),
//         });
//         // Call function to fetch directions
//         getDirections(center, {
//             lat: e.latLng.lat(),
//             lng: e.latLng.lng(),
//         });
//     };

//     const handleMarkerClick = (place: any) => {
//         setSelectedPlace(place);
//     };

//     const handleZoomChanged = () => {
//         if (mapRef.current) {
//             setZoom(mapRef.current.getZoom());
//         }
//     };

//     const getDirections = (origin: any, destination: any) => {
//         if (!userLocation) return;

//         const directionsService = new google.maps.DirectionsService();

//         const travelModes: google.maps.TravelMode[] = [
//             google.maps.TravelMode.DRIVING,
//             google.maps.TravelMode.WALKING,
//             google.maps.TravelMode.BICYCLING,
//             google.maps.TravelMode.TRANSIT
//         ];
//         const travelTimePromises = travelModes.map((mode: google.maps.TravelMode) => {
//             return new Promise<{ mode: string, result: google.maps.DirectionsResult }>((resolve, reject) => {
//                 directionsService.route(
//                     {
//                         origin,
//                         destination,
//                         travelMode: mode,
//                     },
//                     (result: any, status) => {
//                         if (status === google.maps.DirectionsStatus.OK) {
//                             resolve({ mode, result });
//                         } else {
//                             reject(status);
//                         }
//                     }
//                 );
//             });
//         });

//         Promise.all(travelTimePromises)
//         .then((results) => {
//                 console.log("kflskfldsfs", results)
//                 setDirections(results[0].result); // Display the first route (DRIVING) by default
//             })
//             .catch((error) => console.error('Error fetching directions:', error));
//     };

//     const [travelTimes, setTravelTimes] = useState({});

//     useEffect(() => {
//         if (directions) {
//             const renderer: any = new window.google.maps.DirectionsRenderer();
//             renderer.setDirections(directions);
//             setDirectionsRenderer(renderer);

//             // Extract and set travel times for different modes
//             const route = directions.routes[0];
//             const legs = route.legs;
//             const travelTimesObj: any = {};
//             legs.forEach((leg: any) => {
//                 const travelMode: any = leg.travel_mode;
//                 const duration = leg.duration.text;
//                 travelTimesObj[travelMode] = duration;
//             });
//             console.log("traveling time", travelTimesObj, directionsRenderer, directions)
//             setTravelTimes(travelTimesObj);
//         }
//     }, [directions]);

//     return (
//         isLoaded && (
//             <GoogleMap
//                 center={center}
//                 mapContainerStyle={containerStyle}
//                 onClick={(e: any) => onMapClick(e)}
//                 mapContainerClassName="googleMap"
//                 onLoad={(map) => {
//                     mapRef.current = map;
//                     handleZoomChanged();
//                     handleMapLoad(map);
//                 }}
//                 zoom={zoom}
//                 onZoomChanged={handleZoomChanged}
//                 onUnmount={onUnmount}
//                 options={{
//                     mapTypeControl: false,
//                     zoomControl: window.innerWidth >= 800 ? true : false,
//                     fullscreenControl: window.innerWidth >= 800 ? true : false,
//                 }}
//             >
//                 {userLocation && (
//                     <Marker
//                         position={userLocation}
//                         onClick={() => handleMarkerClick(userLocation)}
//                     />
//                 )}
//                 {directions && (
//                     <DirectionsRenderer
//                         directions={directions}
//                         options={{ suppressMarkers: true }}
//                     />
//                 )}
//             </GoogleMap>
//         )
//     );
// };

// export default DirectionMapUi;



// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//     DirectionsRenderer,
//     GoogleMap,
//     Marker,
//     useJsApiLoader,
// } from "@react-google-maps/api";
// import { useMyContext } from "@/app/Context/MyContext";

// interface GoogleMapCompProps {}

// interface ValidResult {
//     mode: google.maps.TravelMode;
//     result: any;
// }


// const containerStyle = {
//     width: "100%",
//     height: "50%",
// };

// const center = {
//     lat: 49.1811261,
//     lng: -2.1051429,
// };

// const DirectionMapUi: React.FC<GoogleMapCompProps> = (props) => {
//     const { isLoaded } = useJsApiLoader({
//         id: "google-map-script",
//         googleMapsApiKey: "AIzaSyAqHi-MH3gDZ0uCWYJL9w6Bi0iHtO_Kzx0",
//     });

//     const { location } = useMyContext();
//     const [selectedLat, setSelectedLat] = useState<number>(49.1811261);
//     const [selectedLong, setSelectedLong] = useState<number>(-2.1051429);
//     const [zoom, setZoom] = useState(15);
//     const mapRef = useRef<any>(null);
//     const [map, setMap] = React.useState<google.maps.Map | null>(null);
//     const [markerLocation, setMarkerLocation] = useState(center);
//     const [selectedPlace, setSelectedPlace] = useState<any>({});
//     const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
//     const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
//     const [travelTimes, setTravelTimes] = useState<{ mode: google.maps.TravelMode; duration: string }[]>([]);
//     const [selectedMode, setSelectedMode] = useState<google.maps.TravelMode>(google.maps.TravelMode.DRIVING);
//     const [validResults, setValidResults] = useState<{ mode: google.maps.TravelMode, result: google.maps.DirectionsResult }[]>([]);

//     const handleMapLoad = useCallback((map: google.maps.Map) => {
//         mapRef.current = map;
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     const userLoc: google.maps.LatLngLiteral = { lat: latitude, lng: longitude };
//                     setUserLocation(userLoc);
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                 }
//             );
//         }
//     }, []);

//     useEffect(() => {
//         setSelectedLat(49.1811261);
//         setSelectedLong(-2.1051429);
//     }, [window.location.pathname]);

//     const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
//         setMap(null);
//     }, []);

//     const onMapClick = (e: google.maps.MapMouseEvent) => {
//         if (e.latLng) {
//             const clickedLocation = {
//                 lat: e.latLng.lat(),
//                 lng: e.latLng.lng(),
//             };
//             setMarkerLocation(clickedLocation);
//             // Call function to fetch directions
//             getDirections(center, clickedLocation);
//         }
//     };

//     const handleMarkerClick = (place: any) => {
//         setSelectedPlace(place);
//     };

//     const handleZoomChanged = () => {
//         if (mapRef.current) {
//             setZoom(mapRef.current.getZoom());
//         }
//     };

//     const getDirections = (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => {
//         const directionsService = new google.maps.DirectionsService();
//         const travelModes: google.maps.TravelMode[] = [
//             google.maps.TravelMode.DRIVING,
//             google.maps.TravelMode.WALKING,
//             google.maps.TravelMode.BICYCLING,
//             google.maps.TravelMode.TRANSIT
//         ];

//         const travelTimePromises = travelModes.map((mode) => {
//             return new Promise<{ mode: google.maps.TravelMode; result: google.maps.DirectionsResult | null }>((resolve, reject) => {
//                 directionsService.route(
//                     {
//                         origin,
//                         destination,
//                         travelMode: mode,
//                     },
//                     (result, status) => {
//                         if (status === google.maps.DirectionsStatus.OK) {
//                             resolve({ mode, result });
//                         } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
//                             resolve({ mode, result: null });
//                         } else {
//                             reject(status);
//                         }
//                     }
//                 );
//             });
//         });

//         Promise.all(travelTimePromises)
//             .then((results: any) => {
//                 setValidResults(results.filter((res: any) => res.result !== null)); // Store the valid results
//                 const validResults: any = results.filter((res: any) => res.result !== null);
//                 if (validResults.length > 0) {
//                     setDirections(validResults[0].result); // Display the first valid route by default
//                     const times = validResults.map(({ mode, result }: ValidResult) => {
//                         const duration = result!.routes[0].legs[0].duration.text;
//                         return { mode, duration };
//                     });
//                     setTravelTimes(times);
//                     setDirections(validResults.find((r: any) => r.mode === selectedMode)?.result || null);
//                 } else {
//                     console.error('No valid routes found.');
//                 }
//                 console.log(results);
//             })
//             .catch((error) => console.error('Error fetching directions:', error));
//     };
//     const handleTravelModeClick = (mode: google.maps.TravelMode) => {
//         setSelectedMode(mode);
//         const selectedResult = validResults.find(result => result.mode === mode);
//         if (selectedResult) {
//             setDirections(selectedResult.result);
//         }
//     };

//     return (
//         isLoaded && (
//             <div style={{height:'35%'}}>
//                 <GoogleMap
//                     center={center}
//                     mapContainerStyle={containerStyle}
//                     onClick={(e: google.maps.MapMouseEvent) => onMapClick(e)}
//                     mapContainerClassName="googleMap"
//                     onLoad={(map) => {
//                         mapRef.current = map;
//                         handleZoomChanged();
//                         handleMapLoad(map);
//                     }}
//                     zoom={zoom}
//                     onZoomChanged={handleZoomChanged}
//                     onUnmount={onUnmount}
//                     options={{
//                         mapTypeControl: false,
//                         zoomControl: window.innerWidth >= 800 ? true : false,
//                         fullscreenControl: window.innerWidth >= 800 ? true : false,
//                     }}
//                 >
//                     {userLocation && (
//                         <Marker
//                             position={userLocation}
//                             onClick={() => handleMarkerClick(userLocation)}
//                         />
//                     )}
//                     {directions && (
//                         <DirectionsRenderer
//                             directions={directions}
//                             options={{ suppressMarkers: true }}
//                         />
//                     )}
//                 </GoogleMap>
//                 <div>
//                     <h3>Travel Times</h3>
//                     <ul>
//                         {travelTimes.map(({ mode, duration }) => (
//                             <li key={mode} onClick={() => handleTravelModeClick(mode)}>
//                                 {mode}: {duration}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         )
//     );
// };

// export default DirectionMapUi;








import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    DirectionsRenderer,
} from "@react-google-maps/api";
import toast from "react-hot-toast";
import { TiInfo } from "react-icons/ti";
import styled from "styled-components";
import Image from "next/image";
import { BikeIcon, BusIcon, CarIcon, WalkingIcon, cycle } from "@/app/utils/ImagePath";
import { useMyContext } from "@/app/Context/MyContext";

interface GoogleMapCompProps {
    latitude: any;
    longitude: any;
}

const containerStyle = {
    width: "100%",
    height: "85%",
};

const center = {
    lat: 49.1811261,
    lng: -2.1051429,
};
const ApiKey: string | any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const DirectionMapUi: React.FC<GoogleMapCompProps> = ({
    latitude, longitude
}) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: ApiKey,
    });

    const { location } = useMyContext();
    const [zoom, setZoom] = useState(15);
    const mapRef = useRef<any>(null);
    const [map, setMap] = React.useState(null);
    const [markerLocation, setMarkerLocation] = useState(center);
    const [selectedPlace, setSelectedPlace] = useState<any>({});
    const [userLocation, setUserLocation] = useState(null);
    const [directions, setDirections] = useState<any>(null);
    const [travelTimes, setTravelTimes] = useState<{ mode: google.maps.TravelMode, duration: string }[]>([]);
    const [selectedMode, setSelectedMode] = useState<google.maps.TravelMode | null>(null);
    const [validResults, setValidResults] = useState<{ mode: google.maps.TravelMode, result: google.maps.DirectionsResult }[]>([]);
    const [selectedBox, setSelectedBox] = useState<string>("DRIVING");

    useEffect(() => {
        if (isLoaded) {
            setSelectedMode(google.maps.TravelMode.DRIVING);
        }
    }, [isLoaded]);



    // const handleMapLoad = useCallback((map: any) => {
    //     const destination = {
    //         lat: latitude,
    //         lng: longitude
    //     }
    //     // Define Jersey Island boundaries
    //     const jerseyBounds = new window.google.maps.LatLngBounds(
    //         new window.google.maps.LatLng(49.1692, -2.2666),
    //         new window.google.maps.LatLng(49.2668, -2.0116)
    //     );

    //     const checkIfInsideJersey = (location: any) => {
    //         return jerseyBounds.contains(new window.google.maps.LatLng(location.lat, location.lng));
    //     };
    //     mapRef.current = map;
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 const userLoc: any = { lat: latitude, lng: longitude };
    //                 // setUserLocation(userLoc);
    //                 // getTravelTimes(userLoc, center);

    //                 // setUserLocation(userLoc);
    //                 const insideJersey = checkIfInsideJersey(userLoc);
    //                 console.log('User is inside Jersey:', insideJersey);
    //                 if (insideJersey) {
    //                     setUserLocation(userLoc);
    //                     setMarkerLocation(destination);
    //                     getTravelTimes(destination, userLoc);
    //                 } else {
    //                     setMarkerLocation(destination);
    //                     getTravelTimes(destination, center);
    //                 }
    //             },

    //             (error) => {
    //                 console.error('Error getting user location:', error);
    //             }
    //         );
    //     }
    // }, []);


    // const handleMapLoad = useCallback((map: any) => {
    //     console.log("kfldsfjslfls", map)

    //     // Define Jersey Island boundaries
    //     const jerseyBounds = new window.google.maps.LatLngBounds(
    //         new window.google.maps.LatLng(49.1692, -2.2666),
    //         new window.google.maps.LatLng(49.2668, -2.0116)
    //     );

    //     const checkIfInsideJersey = (location: any) => {
    //         return jerseyBounds.contains(new window.google.maps.LatLng(location.lat, location.lng));
    //     };
    //     mapRef.current = map;
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 const userLoc: any = { lat: latitude, lng: longitude };
    //                 // setUserLocation(userLoc);
    //                 // getTravelTimes(userLoc, center);

    //                 // setUserLocation(userLoc);
    //                 const insideJersey = checkIfInsideJersey(userLoc);
    //                 if (latitude && longitude) {
    //                     const destination = { lat: latitude, lng: longitude };
    //                     if(insideJersey){
    //                         setUserLocation(userLoc);
    //                         setMarkerLocation(destination);
    //                         getTravelTimes(userLoc, destination);
    //                     } else {
    //                         setMarkerLocation(destination);
    //                         getTravelTimes(center, destination);

    //                     }
    //                 }
    //             },

    //             (error) => {
    //                 console.error('Error getting user location:', error);
    //             }
    //         );
    //     }
    // }, [latitude, longitude, location?.latitude, location.longitude]);




    useEffect(() => {
        const Timer = setTimeout(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (location?.latitude && location.longitude) {
                            const jerseyBounds = new window.google.maps.LatLngBounds(
                                new window.google.maps.LatLng(49.1692, -2.2666),
                                new window.google.maps.LatLng(49.2668, -2.0116)
                            );

                            const checkIfInsideJersey = (location: any) => {
                                return jerseyBounds.contains(new window.google.maps.LatLng(location.lat, location.lng));
                            };
                            if (latitude && longitude) {
                                const destination = { lat: latitude, lng: longitude };
                                const origin = { lat: location?.latitude, lng: location.longitude };
                                const insideJersey = checkIfInsideJersey(origin);
                                if (insideJersey) {
                                    setMarkerLocation(destination);
                                    getTravelTimes(origin, destination);
                                } else {
                                    setMarkerLocation(destination);
                                    getTravelTimes(center, destination);
                                    toast.custom(<div style={{ width: '150px', background: 'white', display: 'flex', gap: '10px', borderRadius: '10px', padding: '10px', boxSizing: 'border-box' }}>
                                        <TiInfo style={{ fontSize: '14px', color: '#FF5733' }} />
                                        <div>User is outside Jersey</div>
                                    </div>)

                                }
                            }
                        }

                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        const destination = { lat: latitude, lng: longitude };
                        setMarkerLocation(destination);
                        getTravelTimes(center, destination);
                        toast.custom(<div style={{ width: '150px', background: 'white', display: 'flex', gap: '10px', borderRadius: '10px', padding: '10px', boxSizing: 'border-box' }}>
                            <TiInfo style={{ fontSize: '14px', color: '#FF5733' }} />
                            <div>{error?.message}</div>
                        </div>)
                    }
                );
            }
        }, 2000);
        return () => clearTimeout(Timer);
    }, [latitude, longitude, location?.latitude, location.longitude, center]);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);

    const onMapClick = (e: any) => {
        // setMarkerLocation({
        //     lat: e.latLng.lat(),
        //     lng: e.latLng.lng(),
        // });
        // getTravelTimes({ lat: e.latLng.lat(), lng: e.latLng.lng() }, center);
    };

    const handleMarkerClick = (place: any) => {
        setSelectedPlace(place);
    };

    const handleZoomChanged = () => {
        if (mapRef.current) {
            setZoom(mapRef.current.getZoom());
        }
    };

    const getTravelTimes = (origin: any, destination: any) => {

        const modes: google.maps.TravelMode[] = [
            google.maps.TravelMode.DRIVING,
            google.maps.TravelMode.WALKING,
            google.maps.TravelMode.BICYCLING,
            google.maps.TravelMode.TRANSIT,
        ];

        const promises = modes.map(mode => {
            return new Promise<{ mode: google.maps.TravelMode, result: google.maps.DirectionsResult }>((resolve, reject) => {
                const directionsService = new window.google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin,
                        destination,
                        travelMode: mode,
                    },
                    (result: any, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            resolve({ mode, result });
                        } else {
                            reject(`Error fetching directions for mode ${mode}: ${status}`);
                        }
                    }
                );
            });
        });

        Promise.all(promises).then(validResults => {
            setValidResults(validResults); // Store the valid results
            const times = validResults.map(({ mode, result }: any) => {
                const duration = result.routes[0].legs[0].duration.text;
                return { mode, duration };
            });
            setTravelTimes(times);
            setDirections(validResults.find(r => r.mode === selectedMode)?.result || null);
        }).catch(error => console.error(error));
    };

    const handleTravelModeClick = (mode: google.maps.TravelMode) => {
        setSelectedMode(mode);
        setSelectedBox(mode);

        const selectedResult = validResults.find(result => result.mode === mode);
        if (selectedResult) {
            setDirections(selectedResult.result);
        }
    };

    return (
        isLoaded && (
            <div style={{ height: '100%' }}>
                <ScrollingMenu>
                    {travelTimes.map(({ mode, duration }) => (
                        <Box
                            $isSelected={selectedBox === mode}
                            key={mode} onClick={() => handleTravelModeClick(mode)}
                        >
                            {
                                mode === "DRIVING" &&
                                <CarIcon color={selectedBox === mode ? 'white' : 'black'} />
                            }
                            {
                                mode === "WALKING" &&
                                <WalkingIcon color={selectedBox === mode ? 'white' : 'black'} />
                            }
                            {
                                mode === "BICYCLING" &&
                                <BikeIcon color={selectedBox === mode ? 'white' : 'black'} />
                            }
                            {
                                mode === "TRANSIT" &&
                                <BusIcon color={selectedBox === mode ? 'white' : 'black'} />
                            }
                            <p>{duration}</p>
                        </Box>
                    ))}
                </ScrollingMenu>
                <GoogleMap
                    center={center}
                    mapContainerStyle={containerStyle}
                    onClick={onMapClick}
                    mapContainerClassName="googleMap"
                    // onLoad={handleMapLoad}
                    zoom={zoom}
                    onZoomChanged={handleZoomChanged}
                    onUnmount={onUnmount}
                    options={{
                        mapTypeControl: false,
                        zoomControl: window.innerWidth >= 800 ? true : false,
                        fullscreenControl: window.innerWidth >= 800 ? true : false,
                    }}
                >
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            onClick={() => handleMarkerClick(userLocation)}
                        />
                    )}
                    {directions && (
                        <DirectionsRenderer
                            directions={directions}
                            options={{ suppressMarkers: true }}
                        />
                    )}
                </GoogleMap>

                {/* <div style={{ position: 'absolute', top: '0' }}>
                    <h3>Travel Times</h3>
                    <ul>
                        {travelTimes.map(({ mode, duration }) => (
                            <li key={mode} onClick={() => handleTravelModeClick(mode)}>
                                 {duration}
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        )
    );
};

export default DirectionMapUi;

const ScrollingMenu = styled.div`
  display: flex;
  overflow: auto;
  gap: 8px;
  padding: 0px 24px;
  margin-bottom: 10px;


  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 800px) {
    padding: 0px 16px;
  }
`;

const Box = styled.div<{ $isSelected: boolean }>`
  display: flex;
  padding: 5px;
  gap: 10px;
  min-width: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: ${(props) => (props.$isSelected ? "2px solid" : "none")};
  background:${(props) => (props.$isSelected ? "#2F80ED" : "rgba(47, 128, 237, 0.08)")};
  cursor: pointer;
  border-color: ${(props) => (props.$isSelected ? "#2F80ED" : "black")};

  p {
    color: ${(props) => (props.$isSelected ? "#fff" : "black")};
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  img {
    margin-left: 3px;
  }
`;
