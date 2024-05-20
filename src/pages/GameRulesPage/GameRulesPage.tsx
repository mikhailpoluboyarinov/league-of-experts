import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Layout } from "../../components/Layout/Layout";
import { Typography } from "@mui/material";
import { GENERAL_TERMS_TEMPLATE } from "../../domains/GameRules/constants/gameRulesFAQ";

export const GameRulesPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Typography variant="h5">{GENERAL_TERMS_TEMPLATE.title}</Typography>
        <Typography variant="body1">
          {GENERAL_TERMS_TEMPLATE.paragraph}
        </Typography>
      </Layout>
      <Footer />
    </>
  );
};
