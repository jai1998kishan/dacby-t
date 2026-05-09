import axios from "axios";

// console.log("url", `${import.meta.env.VITE_BACKEND_URL}`);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default api;
