import Box from "@mui/system/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AppMap from "./../components/map";
import AppDrawer from "./../components/drawer";
import SearchSelectDriver from "../components/atom/SearchSelectDriver";
import SearchOrderNumber from "../components/atom/SearchOrderNo";
import { useSelector } from "react-redux";
import { selectDriverOrderId } from "../toolkit/slices/DriverOrderId";
import SearchSelectRoute from "../components/atom/SearchSelectRoute";

const Dashboard = () => {
  const Id = useSelector(selectDriverOrderId);

  return (
    <div>
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
              <Button variant="contained" color="primary">
                Create Route
              </Button>
            </Box>
          </Box>
          <Box height="40px" />
          <SearchSelectRoute />
          <Box height="20px" />
          <SearchSelectDriver />
          <Box height="20px" />
          {Id && <SearchOrderNumber />}
          <AppMap />
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
