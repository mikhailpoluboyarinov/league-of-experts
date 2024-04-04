import { User } from "../index";
import { users } from "./DTO";

export const fetchUsers = (): Promise<User[]> => {
  return Promise.resolve(users);
};
