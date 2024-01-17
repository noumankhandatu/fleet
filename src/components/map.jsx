/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
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
import {
  center,
  customMarkerIcon,
  directionOptions,
  googleMapsLibraries,
  myApiKey,
  styleBox,
} from "./utils";

const AppMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: myApiKey,
    libraries: googleMapsLibraries,
  });

  const [stops, setStops] = useState([]);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [routesPlaceId, setRoutesPlaceId] = useState(null);
  const [placeIdLocations, setPlaceIdLocations] = useState();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (map && map !== null && routesPlaceId) {
        const placesService = new window.google.maps.places.PlacesService(map);
        const locationsWithDetails = await Promise.all(
          routesPlaceId.map(async (place) => {
            return new Promise((resolve, reject) => {
              placesService.getDetails(
                {
                  placeId: place.place_id,
                },
                (result, status) => {
                  if (status === "OK") {
                    const location = {
                      lat: result.geometry.location.lat(),
                      lng: result.geometry.location.lng(),
                    };
                    resolve(location);
                  } else {
                    reject(status);
                  }
                }
              );
            });
          })
        );
        if (locationsWithDetails) {
          setPlaceIdLocations(locationsWithDetails);
        }
      }
    };

    fetchPlaceDetails();
  }, [map, routesPlaceId, stops]);

  const calculateRoute = async () => {
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

    if (results.status === "OK" && results?.geocoded_waypoints) {
      setRoutesPlaceId(results?.geocoded_waypoints);
    }

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const handlePlaceChanged = (index) => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const updatedStops = [...stops];
      console.log(updatedStops, "updatedStops");
      updatedStops[index].location = place.formatted_address;
      updatedStops[index].place_id = place.place_id;
      setStops(updatedStops);
    }
  };

  const addStop = () => {
    const newStop = { location: "", departureTime: "", note: "" };
    setStops([...stops, newStop]);
  };
  const removeStop = (index, removeLocationId) => {
    const updatedStops = [...stops];
    updatedStops.splice(index, 1);
    setStops(updatedStops);
    const myNewLocatitons = routesPlaceId.filter((ele) => {
      return ele.place_id !== removeLocationId;
    });
    if (myNewLocatitons) {
      setRoutesPlaceId(myNewLocatitons);
    }
  };

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
    <div style={{ display: "flex", width: "100%", gap: 40 }}>
      <div style={{ width: "90%", height: "100px" }}>
        <Box height="20px" />
        <RouteStopStatic />
        <Box height="20px" />
        <StartDestination ref={originRef} />
        <Box height="20px" />
        {/* Stops Started */}
        {stops.map((stop, index) => {
          return (
            <div key={index}>
              <Grid container spacing={4} sx={{ alignItems: "end" }}>
                <Grid style={{ textAlign: "center" }} xs={2}>
                  Stop {index + 1}
                </Grid>
                <Grid xs={3}>
                  <Box sx={styleBox}>
                    <Autocomplete
                      onLoad={(auto) => setAutocomplete(auto)}
                      onPlaceChanged={() => handlePlaceChanged(index)}
                    >
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
                  <Box sx={styleBox}>
                    <TextField
                      label={`Stop ${index + 1} Note`}
                      value={stop.note}
                      onChange={(e) => {
                        const updatedStops = [...stops];
                        updatedStops[index].note = e.target.value;
                        setStops(updatedStops);
                      }}
                    />
                  </Box>
                </Grid>
                <Grid xs={1}>
                  <IconButton onClick={() => removeStop(index, stop?.place_id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          );
        })}
        {/* End filed started */}
        <EndDestination ref={destinationRef} duration={duration} distance={distance} />
        <Button
          onClick={addStop}
          color="warning"
          fullWidth
          variant="contained"
          sx={{ mt: 6, mb: 6 }}
        >
          Add Another Stop
        </Button>
        <Box sx={{ display: "flex", justifyContent: "end", mb: 10 }}>
          <Button onClick={clearRoute} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={calculateRoute} sx={{ ml: 1 }} variant="contained" color="primary">
            Create Route
          </Button>
        </Box>
      </div>
      <div style={{ width: "90%", height: "100vh" }}>
        <GoogleMap
          center={center}
          zoom={15}
          options={{
            mapTypeId: window.google.maps.MapTypeId.HYBRID,
            mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: window.google.maps.ControlPosition.TOP_RIGHT,
            },
          }}
          mapContainerStyle={{ width: "100%", height: "500px" }}
          onLoad={(map) => setMap(map)}
        >
          {placeIdLocations &&
            placeIdLocations.map((location, index) => (
              <MarkerF
                key={index}
                icon={customMarkerIcon(`${index + 1}`, 20)}
                position={location}
              />
            ))}

          {directionsResponse && (
            <DirectionsRenderer options={directionOptions} directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default AppMap;
