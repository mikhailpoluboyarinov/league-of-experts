import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { CUSTOM_COLORS } from "../../styles/colors";
import { Telegram } from "@mui/icons-material";

export const Footer = () => {
  return (
    <AppBar
      position="static"
      style={{
        top: "auto",
        bottom: 0,
        backgroundColor: CUSTOM_COLORS.headerFooter,
      }}
    >
      <Toolbar style={{ minHeight: "64px" }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="caption" style={{ marginRight: "10px" }}>
            Наши соцсети:
          </Typography>
          <Link
            href="#"
            underline="none"
            color="white"
            style={{ marginRight: "60px"}}
          >
            <Telegram />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
