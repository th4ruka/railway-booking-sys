import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // Connect to backend

const mapContainerStyle = {
  width: "100%",
  height: "400px"
};

const center = { lat: 40.7128, lng: -74.0060 };

const TrainTracker = () => {
  const [trainLocations, setTrainLocations] = useState([]);

  // useEffect(() => {
  //   socket.on("trainUpdate", (data) => {
  //     setTrainLocations(data);
  //   });

  //   return () => socket.off("trainUpdate");
  // }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={center}>
        {trainLocations.map((train) => (
          <Marker
            key={train.id}
            position={{ lat: train.lat, lng: train.lng }}
            label={train.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default TrainTracker;
