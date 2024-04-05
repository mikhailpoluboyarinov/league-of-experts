import { Country } from "../index";
import { countries } from "./DTO";

export const fetchCountries = (): Promise<Country[]> => {
  return Promise.resolve(countries);
};
