import { Misc } from "../index";
import { miscs } from "./DTO";

export const fetchMisc = (): Promise<Misc[]> => {
  return Promise.resolve(miscs);
};
