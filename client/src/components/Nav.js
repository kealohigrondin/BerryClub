import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const pages = [{ title: "Recipes", route: "/recipes" }];
  const settings = [
    { title: "Profile", route: "/dashboard" },
    { title: "Logout", route: "/auth/logout" },
  ];
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();

  if (!auth) {
    return null;
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" style={{ background: "darkslateblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Shows on desktop */}
          <Button
          id="desktopTitle"
            sx={{
              mr: 6,
              display: { xs: "none", md: "flex" },
              fontWeight: 800,
              fontFamily: "monospace",
              fontSize: "1.2em",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            🍇 Berry Club
          </Button>
          <Box
            id="desktopNav"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map(({ title, route }) => (
              <Button
                key={title}
                onClick={() => navigate(route)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {title}
              </Button>
            ))}
          </Box>

          
          <Box
            id="mobileNav"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ title, route }) => (
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <Link to={route}>{title}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          

          <Typography
            id="mobileTitle"
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            🍇 BERRY CLUB
          </Typography>

          {/* Shows on both */}
          <Box id="settingsMenu" sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ title, route }) => (
                <MenuItem key={title} onClick={handleCloseNavMenu}>
                  <a href={route}>{title}</a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
