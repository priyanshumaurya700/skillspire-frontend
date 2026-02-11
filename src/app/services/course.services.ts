'use client";'

import { api } from "./api";
const token = localStorage.getItem("token");

export const createCourse = (formData: any) => {
  return api.post("/api/courses/create", formData);
};

export const getAllCourses = () => {
  return api.get("/api/courses/all");
};

export const getCourseById = (id: string) => {
  return api.get(`/api/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
