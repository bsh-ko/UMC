// src/apis/auth.ts

import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// ================================
// 토큰 관련 유틸리티 함수
// ================================

// Access Token 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
};

// Access Token 저장하기
export const setAccessToken = (token: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
};

// Access Token 삭제하기
export const removeAccessToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
};

// Refresh Token 가져오기
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
};

// Refresh Token 저장하기
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
};

// Refresh Token 삭제하기
export const removeRefreshToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};

// 두 토큰 모두 삭제 (로그아웃 시 사용)
export const removeTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

// 로그인 상태 확인 (Access Token 존재 여부로 판단)
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// ================================
// 인증 관련 API 함수
// ================================

// 회원가입 요청
export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  // /v1/auth/signup 엔드포인트로 회원가입 요청
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

// 로그인 요청
export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  // /v1/auth/signin 엔드포인트로 로그인 요청
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  // 로그인 성공 시, Access Token과 Refresh Token을 로컬스토리지에 저장
  setAccessToken(data.access_token);
  setRefreshToken(data.refresh_token);

  return data;
};

// 로그아웃 요청
export const postLogout = async () => {
  // /v1/auth/signout 엔드포인트로 로그아웃 요청
  await axiosInstance.post("/v1/auth/signout");

  // 로그아웃 시, 두 토큰 모두 삭제
  removeTokens();
};

// 내 정보 조회 (마이페이지 등에서 사용)
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  // /v1/users/me 엔드포인트로 내 정보 요청
  const { data } = await axiosInstance.get("/v1/users/me");
  return data;
};

// Refresh Token으로 Access Token 재발급 요청
export const postRefreshToken = async (refreshToken: string) => {
  // /v1/auth/refresh 엔드포인트로 토큰 재발급 요청
  // (axiosInstance가 아닌 기본 axios를 사용하는 것이 안전)
  // 예시: return axios.post("/v1/auth/refresh", { refresh_token: refreshToken });
};
