import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export default apiInstance;
