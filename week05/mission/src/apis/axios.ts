import axios, { AxiosInstance } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. 401(Unauthorized) 에러이고, 재시도 안 한 요청만 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 2. Refresh Token 가져오기
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
        if (!refreshToken) {
          // Refresh Token도 없으면 로그아웃 처리
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // 3. 토큰 재발급 요청 (기본 axios 사용)
        const res = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`, {
          refresh_token: JSON.parse(refreshToken),
        });

        // 4. 새 Access Token 저장
        localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, JSON.stringify(res.data.access_token));

        // 5. 원래 요청 헤더에 새 토큰 반영
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;

        // 6. 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료/실패 시 로그아웃
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
