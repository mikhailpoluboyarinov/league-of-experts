import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { customColors } from "../../styles/colors";

export const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: customColors.headerFooter }}
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
