import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const UpdateOpen = useAppStore((state) => state.UpdateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleNotificationsClick = (event) => setNotificationAnchorEl(event.currentTarget);

  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleMyAccountClick = () => {
    navigate("/account");
    handleMenuClose();
  };

  const notificationMenu = (
    <Menu anchorEl={notificationAnchorEl} open={isNotificationMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>No new notifications</MenuItem>
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu anchorEl={anchorEl} id={menuId} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleMyAccountClick}>Account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" elevation={0} sx={{ background: "#ffffff", color: "black" }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => UpdateOpen(!dopen)}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <img src="LT.png" alt="Logo" style={{ height: "50px", objectFit: "contain" }} />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton color="error" onClick={() => window.open("https://www.facebook.com", "_blank")}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="error" onClick={() => window.open("https://www.linkedin.com", "_blank")}>
                <LinkedInIcon />
              </IconButton>
              <IconButton color="error" onClick={() => window.open("https://www.instagram.com", "_blank")}>
                <InstagramIcon />
              </IconButton>
            </Box>
            <IconButton size="large" color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Add this marginTop to prevent content from being overlapped by the AppBar */}
      <Box sx={{ marginTop: "64px" }}>
        {renderMenu}
        {notificationMenu}
        {/* Add your main content below the navbar */}
      </Box>
    </>
  );
}
