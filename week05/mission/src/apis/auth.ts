import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";
const TOKEN_KEY = "auth_token";

// 토큰 가져오기
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// 토큰 저장하기
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// 토큰 삭제하기 (로그아웃)
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// 토큰 존재 여부로 로그인 상태 확인
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};
