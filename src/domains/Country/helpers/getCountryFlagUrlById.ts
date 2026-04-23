import { Country, CountryId } from "../index";
import { getCountryFlagUrl } from "./getCountryFlagUrl";

export const getCountryFlagUrlById = (countries: Country[], id: CountryId) => {
  const country = countries.find((country) => country.id === id);

  if (!country) {
    return "https://purecatamphetamine.github.io/country-flag-icons/3x2/UN.svg";
  }

  return getCountryFlagUrl(country.code);
};
