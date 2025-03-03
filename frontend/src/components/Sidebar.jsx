import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";

// Import SVG icons (ensure these are white-friendly or adjust filters)
import HomeIcon from "../assets/home-solid.svg";
import CalenderIcon from "../assets/sceduled.svg";
import ProjectsIcon from "../assets/starred.svg";
import PowerOffIcon from "../assets/power-off-solid.svg";

// Define drawer width
const drawerWidth = 240;

// Opened mixin for white background and subtle shadow
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#ffffff",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
});

// Closed mixin for white background
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  background: "#ffffff",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const HighlightLine = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  top: 0,
  height: "100%",
  width: "4px",
  background: "#4e54c8",
  borderRadius: "2px",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  opacity: 0,
}));

export default function Sidenav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const activeRoute = location.pathname;

  // Retrieve role from localStorage (e.g., "admin", "parent", etc.)
  const role = localStorage.getItem("role");

  // Grouped menu items: Home, and then a group for Calendar & Planning
  const mainMenu = [
    { text: "Home", path: "/home", icon: HomeIcon },
  ];

  const planningGroup = [
    { text: "Calendar", path: "/calendar", icon: CalenderIcon },
    ...((role === "admin" || role === "prof") ? [{ text: "Planning", path: "/planning", icon: CalenderIcon }] : []),
    ...(role === "parent" ? [{ text: "Créer un élève", path: "/create-eleve", icon: CalenderIcon }] : []),
  ];
  
  const secondaryMenu = [
    { text: "Settings", path: "/settings", icon: ProjectsIcon },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? (
              <ChevronLeftIcon sx={{ color: "#666" }} />
            ) : (
              <MenuIcon sx={{ color: "#666" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />

        {/* Main menu items */}
        <List>
          {mainMenu.map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: "block", position: "relative" }}
              onClick={() => navigate(item.path)}
            >
              <HighlightLine
                sx={{
                  opacity: activeRoute === item.path ? 1 : 0,
                  transform: `translateY(${index * 48}px)`,
                }}
              />
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": { background: "rgba(0, 0, 0, 0.05)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.text}
                    width="24"
                    height="24"
                    style={{ filter: "brightness(0) invert(0)" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "#666",
                    fontWeight: activeRoute === item.path ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Divider between groups */}
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />

        {/* Group for Calendar & Planning */}
        <List>
          {planningGroup.map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: "block", position: "relative" }}
              onClick={() => navigate(item.path)}
            >
              <HighlightLine
                sx={{
                  opacity: activeRoute === item.path ? 1 : 0,
                  transform: `translateY(${index * 48}px)`,
                }}
              />
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": { background: "rgba(0, 0, 0, 0.05)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.text}
                    width="24"
                    height="24"
                    style={{ filter: "brightness(0) invert(0)" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "#666",
                    fontWeight: activeRoute === item.path ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Divider */}
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />

        {/* Secondary menu items */}
        <List>
          {secondaryMenu.map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: "block", position: "relative" }}
              onClick={() => navigate(item.path)}
            >
              <HighlightLine
                sx={{
                  opacity: activeRoute === item.path ? 1 : 0,
                  transform: `translateY(${index * 48}px)`,
                }}
              />
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  "&:hover": { background: "rgba(0, 0, 0, 0.05)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.text}
                    width="24"
                    height="24"
                    style={{ filter: "brightness(0) invert(0)" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "#666",
                    fontWeight: activeRoute === item.path ? "bold" : "normal",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Divider */}
        <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />

        {/* Logout Button */}
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate("/login")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                "&:hover": { background: "rgba(0, 0, 0, 0.05)" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  src={PowerOffIcon}
                  alt="Logout"
                  width="24"
                  height="24"
                  style={{ filter: "brightness(0) invert(0)" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{ opacity: open ? 1 : 0, color: "#666" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
