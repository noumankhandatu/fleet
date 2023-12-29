import React, { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Skeleton } from "@mui/material/Skeleton";
import { Clear as ClearIcon, LocationOn as LocationOnIcon } from "@mui/icons-material";
import { Box } from "@mui/material";

// Import the Material-UI styles
import { styled } from "@mui/system";

const center = { lat: 48.8584, lng: 2.2945 };

const SkeletonText = styled(Skeleton)({
  width: "100%",
  height: "100%",
});

function Map() {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  return (
    <Container component="main" sx={{ position: "relative", height: "100vh", width: "100vw" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: "lg", m: 4, bgcolor: "white", boxShadow: "base" }}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={[]}
                    renderInput={(params) => (
                      <TextField {...params} label="Origin" inputRef={originRef} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={[]}
                    renderInput={(params) => (
                      <TextField {...params} label="Destination" inputRef={destinationRef} />
                    )}
                  />
                </Grid>
              </Grid>
              <ButtonGroup>
                <Button color="pink" onClick={calculateRoute}>
                  Calculate Route
                </Button>
                <Button onClick={clearRoute} startIcon={<ClearIcon />} />
              </ButtonGroup>
            </Stack>
            <Stack spacing={4} mt={4} direction="row" justifyContent="space-between">
              <Typography>Distance: {distance}</Typography>
              <Typography>Duration: {duration}</Typography>
              <Button
                aria-label="center back"
                startIcon={<LocationOnIcon />}
                variant="outlined"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              >
                Center Map
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Map;
