// hooks/mutations/usePostLp.ts
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { uploadImageWithAuth, uploadImageWithoutAuth } from "../../apis/imageUpload"; // 이미지 업로드 API 호출

interface LpFormData {
  title: string;
  content: string;
  tags: string[];
  image: File | null;
  isAuthenticated: boolean; // 인증 여부
}

const postLp = async (data: LpFormData) => {
  let thumbnail = "";

  if (data.image) {
    // 인증이 필요한 경우
    if (data.isAuthenticated) {
      thumbnail = await uploadImageWithAuth(data.image);
    }
    // 인증이 필요 없는 경우
    else {
      thumbnail = await uploadImageWithoutAuth(data.image);
    }
  }

  const res = await axiosInstance.post("/v1/lps", {
    title: data.title,
    content: data.content,
    tags: data.tags,
    thumbnail: thumbnail, // 업로드한 이미지의 URL을 thumbnail로 설정
    published: true, // 이미지를 업로드하면 바로 공개되는 것으로 설정
  });

  return res.data;
};

const usePostLp = () => {
  return useMutation({ mutationFn: postLp });
};

export default usePostLp;
