"use client";

import { api } from "./api";

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export const createCourse = (formData: any) => {
  return api.post("/api/courses/create", formData);
};

export const getAllCourses = () => {
  return api.get("/api/courses/all");
};

export const getCourseById = (id: string) => {
  return api.get(`/api/courses/${id}`);
};

export const assignCourseToTeacher = (courseId: string, teacherId: string) => {
  return api.post("/api/courses/assign", {
    courseId,
    teacherId,
  });
};
