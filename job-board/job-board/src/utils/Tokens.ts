import { jwtDecode } from "jwt-decode";
import { Role } from "./types";

type decodedT = {
  id: string;
  exp: number;
  role: Role;
};
export const decodeToken = (token: string) => {
  const { id, role, exp } = jwtDecode(token) as decodedT;

  return { id, role, exp, token };
};
