import { CountryCode } from "../index";

const BASE_URL_SVG = `https://purecatamphetamine.github.io/country-flag-icons/3x2/`;
const OPTIONAL_URL_SVG = `https://purecatamphetamine.github.io/country-flag-icons-other/3x2/`;

export const getCountryFlagUrl = (countryCode: CountryCode) => {
  if (countryCode === "SCOTLAND") {
    return `${OPTIONAL_URL_SVG}GB-sct.svg`;
  } else if (countryCode === "ENGLAND") {
    return `${OPTIONAL_URL_SVG}GB-eng.svg`;
  } else if (countryCode === "WALES") {
    return `${OPTIONAL_URL_SVG}GB-wls.svg`;
  }
  return `${BASE_URL_SVG}${countryCode}.svg`;
};
