import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { CUSTOM_COLORS } from "../../styles/colors";

export const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: CUSTOM_COLORS.headerFooter }}
    >
      <Toolbar style={{ minHeight: "64px" }}>
        <Typography variant="h6" style={{ marginLeft: "20px" }}>
          <Link href="/" underline="none" color="white">
            League of Experts
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
