import { Country } from "../index";
import axios from "axios";
import { API_HOST } from "../../../constants";

export const fetchCountries = async (): Promise<Country[]> => {
  const countriesDto = await axios.get(API_HOST + "api/countries");

  if (!Array.isArray(countriesDto.data)) {
    throw new Error(
      "Ошибка валидации данных стран: ожидаем массив, пришел не массив.",
    );
  }

  try {
    return countriesDto.data.map((country) => {
      return {
        id: country.id,
        name: country.name,
        code: country.code,
        nameRus: country.nameRus,
        group: country.group,
      };
    });
  } catch (e) {
    throw new Error(
      "Ошибка валидации данных стран: матч не соответствует типу.",
    );
  }
};
