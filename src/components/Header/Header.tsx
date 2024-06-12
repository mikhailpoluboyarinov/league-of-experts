import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  Box,
  IconButton,
  ListItemText,
  ListItem,
  Drawer,
  List,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { CUSTOM_COLORS } from "../../styles/colors";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 800px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        backgroundColor: CUSTOM_COLORS.headerFooter,
        height: "100%",
        color: "white",
      }}
      onClick={handleDrawerToggle}
    >
      <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }} />
      <List>
        <ListItem button component={Link} href="/group">
          <ListItemText primary="Групповой этап" />
        </ListItem>
        <ListItem button component={Link} href="/playoff">
          <ListItemText primary="Плейофф" />
        </ListItem>
        <ListItem button component={Link} href="/matches">
          <ListItemText primary="Матчи" />
        </ListItem>
        <ListItem button component={Link} href="/results-per-day">
          <ListItemText primary="Результаты" />
        </ListItem>
      </List>
      <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }} />
        <ListItem button component={Link} href="/faq">
          <ListItemText primary="FAQ" />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: CUSTOM_COLORS.headerFooter }}
      >
        <Toolbar style={{ minHeight: "64px" }}>
          <Typography
            variant="h6"
            style={{ marginLeft: "20px", fontWeight: "bold" }}
          >
            <Link href="/" underline="none" color="white">
              League of Experts
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit" component={Link} href="/group">
              Групповой этап
            </Button>
            •
            <Button color="inherit" component={Link} href="/playoff">
              Плейофф
            </Button>
            •
            <Button color="inherit" component={Link} href="/matches">
              Матчи
            </Button>
            •
            <Button color="inherit" component={Link} href="/results-per-day">
              Результаты
            </Button>
            •
            <Button color="inherit" component={Link} href="/faq">
              FAQ
            </Button>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              style={{ paddingRight: "20px" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
