import {Country, CountryId} from "../index";
import {getCountryFlagUrl} from "./getCountryFlagUrl";


export const getCountryFlagUrlById = (countries: Country[], id: CountryId) => {
    const country = countries.find((country) => country.id === id);

    if (!country) {
        return;
    }

    return getCountryFlagUrl(country.code);
};