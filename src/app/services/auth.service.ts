import { api } from "./api";

export const login = (data: any) => {
  return api.post("/api/users/login", data);
};

export const register = (data: any) => {
  return api.post("/api/users/register", data);
};

export const userProfile = () => {
  return api.get("/api/users/profile");
};
