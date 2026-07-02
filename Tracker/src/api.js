import axios from "axios";

const api = axios.create({
  baseURL: "https://task-tracker-9jz4.onrender.com",
});

export default api;