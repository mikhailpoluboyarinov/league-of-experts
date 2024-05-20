import { Typography } from "@mui/material";
import React from "react";

interface TitleProps {
  title: string;
}
export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <>
      <Typography
        variant="h4"
        align="left"
        gutterBottom
        style={{
          paddingTop: "40px",
          paddingBottom: "10px",
          color: "#1c0c0c",
        }}
      >
        {title}
      </Typography>
    </>
  );
};
