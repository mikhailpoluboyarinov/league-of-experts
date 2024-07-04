import {
  AppBar,
  Box,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CUSTOM_COLORS } from "../../styles/colors";
import { Telegram } from "@mui/icons-material";
import { ReactComponent as YaMusic } from "../../images/icon_YaMusic.svg";

export const Footer = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");

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
            Новости футбола и музыка:
          </Typography>
          <Link
            target="_blank"
            href="https://t.me/morefoot"
            underline="none"
            color="white"
            style={{ marginRight: "10px" }}
          >
            <Telegram />
          </Link>
          <Link
            target="_blank"
            href="https://music.yandex.ru/users/sir.alex.dee/playlists/1010"
            underline="none"
            style={{ marginRight: isSmallScreen ? `15px` : `60px` }}
          >
            <YaMusic style={{ width: "24px", height: "24px" }} />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
