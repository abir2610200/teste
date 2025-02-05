import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home"; // Icône Home
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Icône En temps réel
import SearchIcon from "@mui/icons-material/Search"; // Icône Recherche
import PhoneIcon from "@mui/icons-material/Phone"; // Icône Modifier téléphone
import ReportProblemIcon from "@mui/icons-material/ReportProblem"; // Icône Réclamation
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Icône Simple
import LayersIcon from "@mui/icons-material/Layers"; // Icône Multiple
import FileUploadIcon from "@mui/icons-material/FileUpload"; // Icône Importer CSV
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Icône Colis en attente
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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

export default function Sidenav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* Section Préférences */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemText primary={"Préférences"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <Divider />

          {/* Sous-menus Préférences */}
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/Dashboard")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/en-temps-reel")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary={"En temps réel"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/recherche")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary={"Recherche"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/modifier-telephone")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={"Modifier téléphone"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/reclamation")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText primary={"Réclamation"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider />

        {/* Section COMMANDES */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemText primary={"COMMANDES"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <Divider />

          {/* Champs COMMANDES */}
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/commande-simple")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={"Simple"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/commande-multiple")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary={"Multiple"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/importer-csv")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <FileUploadIcon />
              </ListItemIcon>
              <ListItemText primary={"Importer CSV"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/colis-en-attente")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <HourglassEmptyIcon />
              </ListItemIcon>
              <ListItemText primary={"Colis en attente"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
         {/* Section Admin */}
         <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemText primary={"Admin"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <Divider />

          {/* Sous-menus Add user */}
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/Home")}>
            <ListItemButton sx={{ minHeight: 40, justifyContent: open ? "initial" : "center", px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add user"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          </List>

        <Divider />
      </Drawer>
    </Box>
  );
}




