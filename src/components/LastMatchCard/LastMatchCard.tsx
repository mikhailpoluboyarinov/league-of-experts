import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import Zizu from "../../images/Zizu.jpg";

export const LastMatchCard = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");

  return (
    <>
      {" "}
      <Card
        style={{
          borderRadius: "10px",
          backgroundImage: `url(${Zizu})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
          color: "#fff",
          position: "relative",
          filter: "brightness(0.5) grayscale(0.8)",
        }}
      >
        <CardContent>
          {isSmallScreen ? (
            <Typography
              align={"right"}
              variant="subtitle1"
              style={{ paddingRight: "10px" }}
            >
              Ближайшие матчи
              <br /> через 2 года . . .
            </Typography>
          ) : (
            <Typography
              align={"right"}
              variant="h5"
              style={{ paddingBottom: "10px", paddingRight: "15px" }}
            >
              Ближайшие матчи
              <br /> через 2 года . . .
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};
