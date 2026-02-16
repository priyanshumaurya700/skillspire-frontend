import { api } from "./api";

export const teachersGet = (data: any) => {
  return api.get("/api/teachers/teachers", data);
};