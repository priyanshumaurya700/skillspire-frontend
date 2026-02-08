import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API,
});
