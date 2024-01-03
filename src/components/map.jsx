import React, { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import Box from "@mui/system/Box";
import RouteStopStatic from "./RouteStopStatic";
import StartDestination from "./startDestination";
import EndDestination from "./endDestination";

const center = { lat: 35.9136156, lng: 74.3588094 };

function AppMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyATph3BCKxFTZucYVofwV2tuUIB-YXqHFg",
    libraries: ["places"],
  });
  const [stops, setStops] = useState([]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const addStop = () => {
    setStops([...stops, { location: "", departureTime: "", note: "" }]);
  };

  const removeStop = (index) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
  };

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return alert("Please enter locations");
    }

    const waypoints = stops.map((stop) => ({
      location: stop.location,
      stopover: true,
    }));

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: waypoints,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setStops([]);
  };

  if (!isLoaded) {
    return <div>Loading ... </div>;
  }

  return (
    <div>
      {distance && distance}
      {duration && duration}
      <Box height="20px" />
      <RouteStopStatic />
      <Box height="20px" />
      <StartDestination ref={originRef} />
      <Box height="20px" />

      {stops.map((stop, index) => (
        <div key={index}>
          <TextField
            label={`Stop ${index + 1} Location`}
            value={stop.location}
            onChange={(e) => {
              const updatedStops = [...stops];
              updatedStops[index].location = e.target.value;
              setStops(updatedStops);
            }}
          />
          <TextField
            label={`Stop ${index + 1} Departure Time`}
            value={stop.departureTime}
            onChange={(e) => {
              const updatedStops = [...stops];
              updatedStops[index].departureTime = e.target.value;
              setStops(updatedStops);
            }}
          />
          <TextField
            label={`Stop ${index + 1} Note`}
            value={stop.note}
            onChange={(e) => {
              const updatedStops = [...stops];
              updatedStops[index].note = e.target.value;
              setStops(updatedStops);
            }}
          />
          <Button onClick={() => removeStop(index)} variant="outlined">
            Remove Stop
          </Button>
          <Box height="20px" />
        </div>
      ))}

      <Button onClick={addStop} variant="outlined">
        Add Another Stop
      </Button>

      <EndDestination ref={destinationRef} duration={duration} distance={distance} />
      <Box height="20px" />

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={clearRoute} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={calculateRoute} sx={{ ml: 1 }} variant="contained" color="primary">
          Create Route
        </Button>
      </Box>
      <Box height="100px" />

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "500px" }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
  );
}

export default AppMap;
