/* eslint-disable react/prop-types */
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/system/Box";
import { Autocomplete } from "@react-google-maps/api";
import { forwardRef } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const EndDestination = ({ duration, distance }, ref) => {
  return (
    <div>
      <Grid container spacing={4} sx={{ alignItems: "end" }}>
        <Grid style={{ textAlign: "center" }} xs={2}>
          <p>End</p>
        </Grid>
        <Grid xs={3}>
          <Box sx={styleBox}>
            <Autocomplete>
              <TextField inputRef={ref} label="Add Stop Location" />
            </Autocomplete>
          </Box>
        </Grid>
        <Grid xs={2}>
          <Box sx={styleBox}>
            <TextField variant="outlined" fullWidth label="Distance" value={distance} disabled />
          </Box>
        </Grid>
        <Grid xs={2}>
          <Box sx={styleBox}>
            <TextField
              variant="outlined"
              fullWidth
              label="Arrival Time"
              value={duration}
              disabled
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
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <FormControlLabel
          control={<Checkbox sx={{ color: "red" }} />}
          label="This stop will be considered  completed when the vehicle arrives, uncheck this box to schedule  and track departure time"
        />
      </Box>
    </div>
  );
};

export default forwardRef(EndDestination);
const styleBox = { mt: 2, display: "flex", alignItems: "center", gap: 1 };
