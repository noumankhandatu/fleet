/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import { Autocomplete } from "@react-google-maps/api";
function StartDestination(props, ref) {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  const currentDateFormatted = currentDate.toLocaleDateString();
  return (
    <div>
      <Grid container spacing={4}>
        <Grid xs={4}>
          <Box sx={styleBox}>
            <p style={{ marginRight: 10 }}>Start</p>
            <Autocomplete>
              <TextField inputRef={ref} label="Add Start Location" />
            </Autocomplete>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box sx={styleBox}>
            <TextField
              variant="outlined"
              fullWidth
              label="Departure Time"
              value={currentTime + currentDateFormatted}
            />
          </Box>
        </Grid>
        <Grid xs={3}>
          {" "}
          <Box sx={styleBox}>
            <TextField variant="outlined" fullWidth label="Write a Note" />
          </Box>
        </Grid>
      </Grid>
      {/* <Box sx={{ textAlign: "center", mt: 3 }}>
        <FormControlLabel
          control={<Checkbox sx={{ color: "red" }} />}
          label="Vehical is expected to already be this stop when the route begins. Uncheck this box to schedule and track arrival time"
        />
      </Box> */}
    </div>
  );
}

export default forwardRef(StartDestination);

const styleBox = { mt: 2, display: "flex", alignItems: "center", gap: 1 };
