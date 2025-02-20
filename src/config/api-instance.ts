import axios from "axios";

// const apiInstance = axios.create({
//   baseURL: "https://mediqi-backend.onrender.com/v1/api",
// });
const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export default apiInstance;
