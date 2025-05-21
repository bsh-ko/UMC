import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLPList = async (PaginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  console.log("🚀 [API 요청] /v1/lps", PaginationDto, "⏰", new Date().toLocaleTimeString());

  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};
