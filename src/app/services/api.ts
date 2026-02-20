"use client";

import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});