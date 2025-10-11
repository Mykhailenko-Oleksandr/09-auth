import axios from "axios";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// axios.defaults.baseURL = "https://notehub-api.goit.study/api";
// axios.defaults.headers.common["Authorization"] = `Bearer ${
//   process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
// }`;
