import AccountCircle from "@mui/icons-material/AccountCircle";
import CottageIcon from "@mui/icons-material/Cottage";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FunctionComponent, ReactNode, useState } from "react";
import { useLocation } from "wouter";

import { clearUserToken } from "../api/tokenStorage";
import { useStateContext } from "./context";

type AppMenuItem = {
  name: string;
  path?: string;
  onClick?: () => void;
};

const AppPagesMenu: FunctionComponent<{
  menuItems: AppMenuItem[];
  positionVertical: "bottom" | "top" | "center";
  positionHorizontal: "center" | "left" | "right";
  icon: ReactNode;
  display: { xs: string; md: string };
  menuTitle?: string;
}> = ({
  menuItems,
  positionVertical,
  positionHorizontal,
  icon,
  display,
  menuTitle,
}) => {
  const [, setLocation] = useLocation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleCloseNavMenu = (item: AppMenuItem) => {
    setAnchorElNav(null);
    if (!item.path && !item.onClick) {
      return;
    }
    if (item.path) {
      setLocation(item.path);
    }
    if (item.onClick) {
      item.onClick();
    }
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <div>
      <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
        {icon}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: positionVertical,
          horizontal: positionHorizontal,
        }}
        keepMounted
        transformOrigin={{
          vertical: positionVertical,
          horizontal: positionHorizontal,
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: display.xs, md: display.md },
        }}
      >
        {menuTitle && (
          <div>
            <MenuItem key={menuTitle} disabled={true}>
              <Typography textAlign="center">{menuTitle}</Typography>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
          </div>
        )}
        {menuItems.map((page) => (
          <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page)}>
            <Typography textAlign="center">{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const DomomirAppBar: FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const stateContext = useStateContext();
  const user = stateContext.state.user;
  const appItems = [
    { name: "Food", path: "/food/recipes" },
    { name: "Fitness", path: "/fitness/plans" },
  ];

  const profileItems = [
    {
      name: "Logout",
      onClick: () => {
        clearUserToken();
        stateContext.dispatch({ type: "SET_USER", payload: null });
        setLocation("/login");
      },
    },
  ];

  const openPage = (page: AppMenuItem) => {
    if (page.path) {
      setLocation(page.path);
    }
  };

  if (!user) return null;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CottageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DOMOMIR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <AppPagesMenu
              menuItems={appItems}
              icon={<MenuIcon />}
              positionHorizontal="left"
              positionVertical="bottom"
              display={{ xs: "block", md: "none" }}
            />
          </Box>
          <CottageIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DOMOMIR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {appItems.map((page) => (
              <Button
                key={page.name}
                onClick={() => openPage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <AppPagesMenu
            menuTitle={user.username}
            menuItems={profileItems}
            icon={<AccountCircle />}
            positionHorizontal="right"
            positionVertical="top"
            display={{ xs: "block", md: "block" }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
