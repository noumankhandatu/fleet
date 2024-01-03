import Box from "@mui/system/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import RadioButtons from "./components/radioButton";
import AppDrawer from "./components/drawer";
import AppMap from "./components/map";

export default function App() {
  return (
    <>
      (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h4">
                <b>Create new Route</b>
              </Typography>
              <Typography variant="caption">Route Name *</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "cennter",
                justifyContent: "space-between",
              }}
            >
              <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Create Route
              </Button>
            </Box>
          </Box>
          <Box height="20px" />
          <TextField id="outlined-basic" variant="outlined" fullWidth label="Route Name" />
          <Box height="20px" />
          <RadioButtons />
          <Box height="20px" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Repeat this route?" />
          <Box height="20px" />
          <hr />
          <AppMap />
        </Box>
      </Box>
      );
    </>
  );
}
