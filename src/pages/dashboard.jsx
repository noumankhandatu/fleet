import Box from "@mui/system/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Paper } from "@mui/material";
import AppMap from "./../components/map";
import AppDrawer from "./../components/drawer";
import SearchableSelect from "../components/atom/SearchSelect";
import SearchOrderNumber from "../components/atom/SearchOrderNo";
import { useSelector } from "react-redux";
import { selectDriverOrderId } from "../toolkit/slices/DriverOrderId";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const authToken = useSelector((state) => state.auth.token);
  const [allRoutesData, setAllRoutesData] = useState(null);
  const Id = useSelector(selectDriverOrderId);

  useEffect(() => {
    const fetchAllRoutes = async () => {
      try {
        const response = await axios.get(
          "https://portal.reliabletiredisposalhq.com/api/all-routes",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response, "response");
        setAllRoutesData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching all routes:", error);
      }
    };

    fetchAllRoutes();
  }, []);
  const handleDeleteRoute = async (id) => {
    try {
      await axios.get(`https://portal.reliabletiredisposalhq.com/api/delete-route/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // Remove the deleted route from the list
      setAllRoutesData((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

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
          <Box height="20px" />
          <SearchableSelect />
          <Box height="20px" />
          {Id && <SearchOrderNumber />}
          <Box height="40px" />
          <AppMap />
        </Box>
      </Box>
      <Box sx={{ ml: 35 }}>
        All Routes
        {allRoutesData &&
          allRoutesData.map((route) => (
            <Paper
              elevation={3}
              sx={{ p: 2, mb: 3, display: "flex", justifyContent: "space-between" }}
              key={route.id}
            >
              {route.route_name}
              <IconButton sx={{ textAlign: "end" }} onClick={() => handleDeleteRoute(route.id)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Paper>
          ))}
      </Box>
    </div>
  );
};

export default Dashboard;
