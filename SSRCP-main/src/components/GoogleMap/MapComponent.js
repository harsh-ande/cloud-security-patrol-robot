import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, LoadScript, Polyline, Polygon } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "560px", // Adjust the height as needed
};

const polygonCoords = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 37.7849, lng: -122.4194 },
  { lat: 37.7849, lng: -122.4094 },
  { lat: 37.7749, lng: -122.4094 },

  { lat: 37.7706, lng: -122.4161 },
];

const MapComponent = () => {
  const [zoom, setZoom] = useState(10); // Default zoom level
  const [path, setPath] = useState([]); // To store the path (lat, lng)
  const [currentPosition, setCurrentPosition] = useState(null); // To store the current position of the car
  const mapRef = useRef(); // Map reference to adjust zoom or center if needed

  useEffect(() => {
    // Set up WebSocket connection to backend
    const socket = new WebSocket("ws://localhost:8080"); // Change to your backend URL

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse incoming location data
      const { lat, lng } = data;

      // Update the car's current position
      setCurrentPosition({ lat, lng });

      // Add new coordinates to the path (car's trip)
      setPath((prevPath) => [...prevPath, { lat, lng }]);
    };

    return () => {
      socket.close(); // Close WebSocket connection when component unmounts
    };
  }, []);

  const handleZoomChange = (map) => {
    setZoom(map?.getZoom() || 15);
  };
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: 37.7849, lng: -122.4194 }} // Default center if no data yet
        zoom={15}
        ref={mapRef}
      >
        {currentPosition && (
          <Marker position={currentPosition || { lat: 37.7849, lng: -122.4194 }} /> // Display the current position of the car
        )}
        <Polyline
          path={path} // The polyline will trace the path of the car
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
        <Polygon
          paths={polygonCoords}
          strokeColor="#FFFFFF"
          strokeOpacity={0}
          strokeWeight={1}
          fillColor="#FFFFFF"
          fillOpacity={0.25}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
