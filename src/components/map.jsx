/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useJsApiLoader, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import Box from "@mui/system/Box";
import RouteStopStatic from "./RouteStopStatic";
import StartDestination from "./startDestination";
import EndDestination from "./endDestination";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Autocomplete } from "@react-google-maps/api";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { MarkerF } from "@react-google-maps/api";

const center = { lat: 33.5651, lng: 73.0169 };

function AppMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"],
  });
  const [stops, setStops] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  // get lat lng states
  const [getStartLocation, setStartLocation] = useState();
  const [getDestination, setDestinations] = useState();
  const [StopsCoordinates, setStopsCoordinates] = useState();
  const addStop = () => {
    const newStop = { location: "", departureTime: "", note: "" };
    setStops([...stops, newStop]);
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
    console.log(results, "results");
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    // Extract lat/lng for stops
    const stopsCoordinates = stops.map((stop, index) => ({
      lat: results.routes[0].legs[index].start_location.lat(),
      lng: results.routes[0].legs[index].start_location.lng(),
    }));
    // Set the stopsCoordinates state
    setStopsCoordinates(stopsCoordinates);
    let originCoordinates = {
      lat: results.routes[0].legs[0].start_location.lat(),
      lng: results.routes[0].legs[0].start_location.lng(),
    };
    if (originCoordinates) {
      setStartLocation(originCoordinates);
    }
    let destinationCoordinates = {
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    };

    if (destinationCoordinates) {
      setDestinations(destinationCoordinates);
    }
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

  const options = {
    markerOptions: {
      suppressMarkers: true,
    },
  };

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
          <Grid container spacing={4} sx={{ alignItems: "end" }}>
            <Grid style={{ textAlign: "center" }} xs={2}>
              Start {index + 1}
            </Grid>
            <Grid xs={3}>
              <Box sx={styleBox}>
                <Autocomplete>
                  <TextField
                    label={`Stop ${index + 1} Location`}
                    value={stop.location}
                    onChange={(e) => {
                      const updatedStops = [...stops];
                      updatedStops[index].location = e.target.value;
                      setStops(updatedStops);
                    }}
                  />
                </Autocomplete>
              </Box>
            </Grid>
            <Grid xs={3}>
              <Box sx={styleBox}>
                <TextField
                  label={`Stop ${index + 1} Departure Time`}
                  value={stop.departureTime}
                  onChange={(e) => {
                    const updatedStops = [...stops];
                    updatedStops[index].departureTime = e.target.value;
                    setStops(updatedStops);
                  }}
                />
              </Box>
            </Grid>
            <Grid xs={3}>
              {" "}
              <Box sx={styleBox}>
                <TextField
                  label={`Stop ${index + 1} Note`}
                  value={stop.note}
                  onChange={(e) => {
                    const updatedStops = [...stops];
                    updatedStops[index].note = e.target.value;
                    setStops(updatedStops);
                  }}
                />{" "}
              </Box>
            </Grid>
            <Grid xs={1}>
              <IconButton onClick={() => removeStop(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}

      <EndDestination ref={destinationRef} duration={duration} distance={distance} />
      <Box height="60px" />
      <Button onClick={addStop} color="warning" fullWidth variant="contained">
        Add Another Stop
      </Button>
      <Box height="60px" />
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
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
        mapContainerStyle={{ width: "100%", height: "500px" }}
        onLoad={(map) => setMap(map)}
      >
        {[getStartLocation, getDestination].map((items, id) => {
          <NumberedMarker label={"test"} position={items} />;
        })}
        {directionsResponse && (
          <DirectionsRenderer
            suppressMarkers={true}
            directions={directionsResponse}
            options={options}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default AppMap;
const styleBox = { mt: 2, display: "flex", alignItems: "center", gap: 1 };

const NumberedMarker = ({ label, position }) => {
  return <MarkerF icon={customMarkerIcon(label, 20)} position={position} />;
};
const customMarkerIcon = (label) => ({
  url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${label}|FF776B|000000`,
  scaledSize: new window.google.maps.Size(40, 60), // Adjust size as needed
});
