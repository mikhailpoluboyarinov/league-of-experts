import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { keyframes } from "@mui/system";
import { getCountryFlagUrl } from "../../domains/Country/helpers/getCountryFlagUrl";
import { FC } from "react";
import { Country, CountryId } from "../../domains/Country";

interface UpcomingMatchCard {
  hostTeamId: CountryId;
  guestTeamId: CountryId;
  description: string;
  isDoublePoints: boolean;
  countries: Country[];
}

export const UpcomingMatchCard: FC<UpcomingMatchCard> = ({
  hostTeamId,
  guestTeamId,
  description,
  isDoublePoints,
  countries,
}) => {
  const shimmer = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }`;

  const gradientBackground = keyframes`
    0% { background: linear-gradient(270deg, #ff007f, #ff00ff); }
    1% { background: linear-gradient(270deg, #fe007f, #fe00ff); }
    2% { background: linear-gradient(270deg, #fd007f, #fd00ff); }
    3% { background: linear-gradient(270deg, #fc007f, #fc00ff); }
    4% { background: linear-gradient(270deg, #fb007f, #fb00ff); }
    5% { background: linear-gradient(270deg, #fa007f, #fa00ff); }
    6% { background: linear-gradient(270deg, #f9007f, #f900ff); }
    7% { background: linear-gradient(270deg, #f8007f, #f800ff); }
    8% { background: linear-gradient(270deg, #f7007f, #f700ff); }
    9% { background: linear-gradient(270deg, #f6007f, #f600ff); }
    10% { background: linear-gradient(270deg, #f5007f, #f500ff); }
    11% { background: linear-gradient(270deg, #f4007f, #f400ff); }
    12% { background: linear-gradient(270deg, #f3007f, #f300ff); }
    13% { background: linear-gradient(270deg, #f2007f, #f200ff); }
    14% { background: linear-gradient(270deg, #f1007f, #f100ff); }
    15% { background: linear-gradient(270deg, #f0007f, #f000ff); }
    16% { background: linear-gradient(270deg, #ef007f, #ef00ff); }
    17% { background: linear-gradient(270deg, #ee007f, #ee00ff); }
    18% { background: linear-gradient(270deg, #ed007f, #ed00ff); }
    19% { background: linear-gradient(270deg, #ec007f, #ec00ff); }
    20% { background: linear-gradient(270deg, #eb007f, #eb00ff); }
    21% { background: linear-gradient(270deg, #ea007f, #ea00ff); }
    22% { background: linear-gradient(270deg, #e9007f, #e900ff); }
    23% { background: linear-gradient(270deg, #e8007f, #e800ff); }
    24% { background: linear-gradient(270deg, #e7007f, #e700ff); }
    25% { background: linear-gradient(270deg, #e6007f, #e600ff); }
    26% { background: linear-gradient(270deg, #e5007f, #e500ff); }
    27% { background: linear-gradient(270deg, #e4007f, #e400ff); }
    28% { background: linear-gradient(270deg, #e3007f, #e300ff); }
    29% { background: linear-gradient(270deg, #e2007f, #e200ff); }
    30% { background: linear-gradient(270deg, #e1007f, #e100ff); }
    31% { background: linear-gradient(270deg, #e0007f, #e000ff); }
    32% { background: linear-gradient(270deg, #df007f, #df00ff); }
    33% { background: linear-gradient(270deg, #de007f, #de00ff); }
    34% { background: linear-gradient(270deg, #dd007f, #dd00ff); }
    35% { background: linear-gradient(270deg, #dc007f, #dc00ff); }
    36% { background: linear-gradient(270deg, #db007f, #db00ff); }
    37% { background: linear-gradient(270deg, #da007f, #da00ff); }
    38% { background: linear-gradient(270deg, #d9007f, #d900ff); }
    39% { background: linear-gradient(270deg, #d8007f, #d800ff); }
    40% { background: linear-gradient(270deg, #d7007f, #d700ff); }
    41% { background: linear-gradient(270deg, #d6007f, #d600ff); }
    42% { background: linear-gradient(270deg, #d5007f, #d500ff); }
    43% { background: linear-gradient(270deg, #d4007f, #d400ff); }
    44% { background: linear-gradient(270deg, #d3007f, #d300ff); }
    45% { background: linear-gradient(270deg, #d2007f, #d200ff); }
    46% { background: linear-gradient(270deg, #d1007f, #d100ff); }
    47% { background: linear-gradient(270deg, #d0007f, #d000ff); }
    48% { background: linear-gradient(270deg, #cf007f, #cf00ff); }
    49% { background: linear-gradient(270deg, #ce007f, #ce00ff); }
    50% { background: linear-gradient(270deg, #cd007f, #cd00ff); }
    51% { background: linear-gradient(270deg, #cc007f, #cc00ff); }
    52% { background: linear-gradient(270deg, #cb007f, #cb00ff); }
    53% { background: linear-gradient(270deg, #ca007f, #ca00ff); }
    54% { background: linear-gradient(270deg, #c9007f, #c900ff); }
    55% { background: linear-gradient(270deg, #c8007f, #c800ff); }
    56% { background: linear-gradient(270deg, #c7007f, #c700ff); }
    57% { background: linear-gradient(270deg, #c6007f, #c600ff); }
    58% { background: linear-gradient(270deg, #c5007f, #c500ff); }
    59% { background: linear-gradient(270deg, #c4007f, #c400ff); }
    60% { background: linear-gradient(270deg, #c3007f, #c300ff); }
    61% { background: linear-gradient(270deg, #c2007f, #c200ff); }
    62% { background: linear-gradient(270deg, #c1007f, #c100ff); }
    63% { background: linear-gradient(270deg, #c0007f, #c000ff); }
    64% { background: linear-gradient(270deg, #bf007f, #bf00ff); }
    65% { background: linear-gradient(270deg, #be007f, #be00ff); }
    66% { background: linear-gradient(270deg, #bd007f, #bd00ff); }
    67% { background: linear-gradient(270deg, #bc007f, #bc00ff); }
    68% { background: linear-gradient(270deg, #bb007f, #bb00ff); }
    69% { background: linear-gradient(270deg, #ba007f, #ba00ff); }
    70% { background: linear-gradient(270deg, #b9007f, #b900ff); }
    71% { background: linear-gradient(270deg, #b8007f, #b800ff); }
    72% { background: linear-gradient(270deg, #b7007f, #b700ff); }
    73% { background: linear-gradient(270deg, #b6007f, #b600ff); }
    74% { background: linear-gradient(270deg, #b5007f, #b500ff); }
    75% { background: linear-gradient(270deg, #b4007f, #b400ff); }
    76% { background: linear-gradient(270deg, #b3007f, #b300ff); }
    77% { background: linear-gradient(270deg, #b2007f, #b200ff); }
    78% { background: linear-gradient(270deg, #b1007f, #b100ff); }
    79% { background: linear-gradient(270deg, #b0007f, #b000ff); }
    80% { background: linear-gradient(270deg, #af007f, #af00ff); }
    81% { background: linear-gradient(270deg, #ae007f, #ae00ff); }
    82% { background: linear-gradient(270deg, #ad007f, #ad00ff); }
    83% { background: linear-gradient(270deg, #ac007f, #ac00ff); }
    84% { background: linear-gradient(270deg, #ab007f, #ab00ff); }
    85% { background: linear-gradient(270deg, #aa007f, #aa00ff); }
    86% { background: linear-gradient(270deg, #a9007f, #a900ff); }
    87% { background: linear-gradient(270deg, #a8007f, #a800ff); }
    88% { background: linear-gradient(270deg, #a7007f, #a700ff); }
    89% { background: linear-gradient(270deg, #a6007f, #a600ff); }
    90% { background: linear-gradient(270deg, #a5007f, #a500ff); }
    91% { background: linear-gradient(270deg, #a4007f, #a400ff); }
    92% { background: linear-gradient(270deg, #a3007f, #a300ff); }
    93% { background: linear-gradient(270deg, #a2007f, #a200ff); }
    94% { background: linear-gradient(270deg, #a1007f, #a100ff); }
    95% { background: linear-gradient(270deg, #a0007f, #a000ff); }
    96% { background: linear-gradient(270deg, #9f007f, #9f00ff); }
    97% { background: linear-gradient(270deg, #9e007f, #9e00ff); }
    98% { background: linear-gradient(270deg, #9d007f, #9d00ff); }
    99% { background: linear-gradient(270deg, #9c007f, #9c00ff); }
    100% { background: linear-gradient(270deg, #9b007f, #9b00ff); }`;

  const hostTeam = countries.find((country) => country.id === hostTeamId);

  const guestTeam = countries.find((country) => country.id === guestTeamId);

  if (!hostTeam || !guestTeam) {
    return null;
  }

  return (
    <Card
      sx={{
        borderRadius: "10px",
        background: "#fafdc4",
        ...(isDoublePoints && {
          animation: `${gradientBackground} 4s infinite alternate`,
          backgroundSize: "200% 200%",
        }),
      }}
    >
      <CardActionArea>
        <CardContent>
          {isDoublePoints && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "gold",
                animation: `${shimmer} 0.5s infinite`,
              }}
            >
              <StarIcon />
            </Box>
          )}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ margin: "16px 0" }}
          >
            <Grid item container direction="column" alignItems="center" xs>
              <Avatar
                alt="123"
                src={getCountryFlagUrl(hostTeam.code)}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  fontWeight: "bold",
                }}
              >
                {hostTeam.nameRus}
              </Typography>
            </Grid>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ margin: "0 16px" }}
            >
              &mdash;
            </Typography>
            <Grid item container direction="column" alignItems="center" xs>
              <Avatar
                alt={"asd"}
                src={getCountryFlagUrl(guestTeam.code)}
                style={{ marginBottom: "8px" }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  fontWeight: "bold",
                }}
              >
                {guestTeam.nameRus}
              </Typography>
            </Grid>
          </Grid>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
              minHeight: "180px",
              textAlign: "center",
            }}
          >
            {description || "Здесь скоро появится анонс матча."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
