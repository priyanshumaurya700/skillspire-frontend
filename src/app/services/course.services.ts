import { api } from "./api";

export const createCourse = (formData: any) => {
  return api.post("/api/courses/create", formData);
};

export const getAllCourses = () => {
  return api.get("/api/courses/all");
};

export const getCourseById = (id: string) => {
  return api.get(`/api/courses/${id}`);
};
