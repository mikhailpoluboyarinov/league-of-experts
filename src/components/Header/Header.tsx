import React from "react";
import { AppBar, Toolbar, Typography, Link, Button, Box } from "@mui/material";
import { CUSTOM_COLORS } from "../../styles/colors";

export const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: CUSTOM_COLORS.headerFooter }}
    >
      <Toolbar style={{ minHeight: "64px" }}>
        <Typography variant="h6" style={{ marginLeft: "20px", fontWeight: "bold" }}>
          <Link href="/" underline="none" color="white">
            League of Experts
          </Link>
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <Button color="inherit" component={Link} href="/group">
            Групповой этап
          </Button>
          •
          <Button color="inherit" component={Link} href="/playoff">
            Плейофф
          </Button>
          •
          {
            /*
            <Button color="inherit" component={Link} href="/matches">
              Матчи
            </Button>
            •*/
          }
          <Button color="inherit" component={Link} href="/results-per-day">
            Результаты
          </Button>
          •
          <Button color="inherit" component={Link} href="/faq">
            FAQ
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
