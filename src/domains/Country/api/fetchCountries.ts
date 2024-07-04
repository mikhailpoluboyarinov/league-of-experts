import { Country } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get(API_HOST + "api/countries");

    if (response.status !== 200) {
      throw new Error(`Ошибка запроса: ${response.statusText}`);
    }

    const countriesDto = response.data;

    if (!Array.isArray(countriesDto)) {
      throw new Error(
        "Ошибка валидации данных стран: ожидаем массив, пришел не массив.",
      );
    }

    return countriesDto.map((country) => ({
      id: country.id,
      name: country.name,
      code: country.code,
      nameRus: country.nameRus,
      group: country.group,
    }));
  } catch (error) {
    console.error("Ошибка при получении данных стран:", error);
    throw error;
  }
};
