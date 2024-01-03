import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const RouteStopStatic = () => {
  return (
    <div>
      <Typography variant="h4">
        <b> Route Stops</b>
      </Typography>
      <Grid container spacing={4} sx={{ alignItems: "end" ,mt:4}}>
        <Grid xs={1}></Grid>
        <Grid xs={3}>
          <p>Destination*</p>
        </Grid>
        <Grid xs={3}>
          <p>Departure*</p>{" "}
        </Grid>
        <Grid xs={3}>
          <p>Notes*</p>{" "}
        </Grid>
      </Grid>
    </div>
  );
};

export default RouteStopStatic;
