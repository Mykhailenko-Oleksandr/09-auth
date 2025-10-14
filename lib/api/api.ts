import axios from "axios";

export const nextServer = axios.create({
  baseURL: "https://09-auth-two-theta.vercel.app/api",
  withCredentials: true,
});
