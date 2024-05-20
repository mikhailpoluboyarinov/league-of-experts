import { Country } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchCountries = async (): Promise<Country[]> => {
  const countriesDto = await axios.get(API_HOST + "api/countries");

  return Promise.resolve(countriesDto.data);
};
