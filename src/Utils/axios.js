import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 1000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get("/refresh");
      } catch (err) {
        window.location.href = "/signIn";
      }

      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
