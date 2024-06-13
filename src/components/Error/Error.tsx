import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import { Grid, Typography } from "@mui/material";
import { Footer } from "../../components/Footer/Footer";
import ErrorImg from "../../images/error.jpg";
import { Link } from "react-router-dom";
import { TEXT_SHADOW } from "../../styles/shadows";
import { useMediaQuery } from "@mui/material";

export const Error = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Header />

      <Layout>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{
                paddingTop: isSmallScreen ? "100px" : "40px",
                textShadow: TEXT_SHADOW.purple,
              }}
            ></Typography>
          </Grid>
          <Grid item>
            <Link to="/">
              <img
                alt="Server Error"
                src={ErrorImg}
                style={{
                  width: isSmallScreen ? "300px" : "600px",
                  height: isSmallScreen ? "200px" : "400px",
                  paddingTop: "20px",
                  backgroundSize: "cover",
                }}
              />
            </Link>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              style={{
                paddingTop: "40px",
                textShadow: TEXT_SHADOW.purple,
              }}
            >
              Мы пытаемся поднять этот чертов сервер . . .
            </Typography>
          </Grid>
        </Grid>
      </Layout>

      <Footer />
    </>
  );
};
