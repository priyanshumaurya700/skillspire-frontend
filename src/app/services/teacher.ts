import { api } from "./api";

export const teachersGet = (data: any) => {
  return api.get("/api/teachers/teachers", data);
};

// assigned course
export const assignedCourseGet = (data: any) => {
  return api.get("/api/teachers/assigned-course", data);
};
