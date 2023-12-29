import React from "react";

export type Role = "CAN" | "EMP";
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormSubmitEvent = React.FormEvent;
export type AuthUser = {
  id: string;
  role: Role;
  token: string;
};

export enum Rol {
  Cand = "CAN",
  Emp = "EMP",
}
