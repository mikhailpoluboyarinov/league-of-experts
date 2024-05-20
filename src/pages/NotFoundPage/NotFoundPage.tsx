import { Header } from "../../components/Header/Header";
import { Layout } from "../../components/Layout/Layout";
import { Grid, Typography } from "@mui/material";
import { Footer } from "../../components/Footer/Footer";
import Image404 from "../../images/PageNotFound.jpeg";
import { Link } from "react-router-dom";
import { TEXT_SHADOW } from "../../styles/shadows";
import { useMediaQuery } from "@mui/material";

export const NotFoundPage = () => {
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
            >
              404 Page Not Found
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/">
              <img
                alt="image404"
                src={Image404}
                style={{
                  width: isSmallScreen ? "300px" : "400px",
                  height: isSmallScreen ? "300px" : "400px",
                  paddingTop: "20px",
                  filter: "grayscale(70%)",
                  opacity: 0.5,
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
              Я специально бил мимо ворот, чтобы вратарь уставал бегать за мячом
              и нам было легче забить.(с)
            </Typography>
          </Grid>
        </Grid>
      </Layout>

      <Footer />
    </>
  );
};
