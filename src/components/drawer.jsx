import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import myList from "./data";
import Box from "@mui/system/Box";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearToken } from "../toolkit/slices/authSlice";

const drawerWidth = 240;

const AppDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearToken());
    toast.success("Logged out successfully");
    navigate("/");
  };
  return (
    <div>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              ml: 2,
              mr: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "42px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/1/15/Fleet_Aircraft_logo.jpg"
                alt=""
              />

              <Typography variant="h5" sx={{ ml: 2 }}>
                Fleat
              </Typography>
            </Box>

            <div>
              <AddAlertIcon fontSize="small" sx={{ mr: 1 }} />
              <EmailIcon fontSize="small" />
            </div>
          </Box>
          <List sx={{ mt: 4 }}>
            {myList &&
              myList?.map((items, id) => {
                const { title, Icon } = items;
                return (
                  <ListItem key={id} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
          <div style={{ position: "absolute", bottom: 10 }}>
            <ListItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </ListItem>
          </div>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
};

export default AppDrawer;
