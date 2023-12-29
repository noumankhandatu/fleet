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
import { Box } from "@mui/material";

const drawerWidth = 240;

const AppDrawer = () => {
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
                style={{ width: "32px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/1/15/Fleet_Aircraft_logo.jpg"
                alt=""
              />

              <Typography variant="h5" sx={{ ml: 2 }}>
                {" "}
                Fleat
              </Typography>
            </Box>

            <div>
              <AddAlertIcon sx={{ mr: 1 }} />
              <EmailIcon />
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

          <Divider />
        </Box>
      </Drawer>
    </div>
  );
};

export default AppDrawer;
