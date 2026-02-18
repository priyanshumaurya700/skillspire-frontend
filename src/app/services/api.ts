"use client";

import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API,
});

export const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  delete api.defaults.headers.common["Authorization"];
}
