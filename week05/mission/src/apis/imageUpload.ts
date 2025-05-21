import { axiosInstance } from "./axios";

// 인증이 필요한 이미지 업로드
export const uploadImageWithAuth = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.imageUrl; // 서버에서 반환된 이미지 URL
};

// 인증이 필요 없는 이미지 업로드
export const uploadImageWithoutAuth = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axiosInstance.post("/v1/uploads/public", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.imageUrl; // 서버에서 반환된 이미지 URL
};
