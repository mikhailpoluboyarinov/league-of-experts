import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Toolbar,
  AppBar,
} from "@mui/material";
import {
  Public,
  Sports,
  MoreHoriz,
  Assessment,
  ListAlt,
  People,
} from "@mui/icons-material";
import { Header } from "../../components/Header/Header";

const drawerWidth = 240;

export const AdminLayoutPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Header />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button component={Link} to="/admin/countries">
              <ListItemIcon>
                <Public />
              </ListItemIcon>
              <ListItemText primary="Countries" />
            </ListItem>
            <ListItem button component={Link} to="/admin/matches">
              <ListItemIcon>
                <Sports />
              </ListItemIcon>
              <ListItemText primary="Matches" />
            </ListItem>
            <ListItem button component={Link} to="/admin/misc">
              <ListItemIcon>
                <MoreHoriz />
              </ListItemIcon>
              <ListItemText primary="Misc" />
            </ListItem>
            <ListItem button component={Link} to="/admin/predictions">
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary="Predictions" />
            </ListItem>
            <ListItem button component={Link} to="/admin/results">
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="Results" />
            </ListItem>
            <ListItem button component={Link} to="/admin/users">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
