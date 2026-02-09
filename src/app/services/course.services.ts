import { api } from "./api";

export const createCourse = (courseData: any) => {
  return api.post("/api/courses/create", courseData);
}

export const getAllCourses = () => {
  return api.get("/api/courses/all");
};

export const getCourseById = (id: string) => {
  return api.get(`/api/courses/${id}`);
};
