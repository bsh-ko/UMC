import axios from "axios";
import { Comment } from "../types/comment";

export const fetchComments = async (
  lpId: string,
  page: number,
  sort: "new" | "old"
): Promise<{ comments: Comment[]; nextPage?: number }> => {
  const res = await axios.get(`http://localhost:8000/v1/lps/${lpId}/comments`, {
    params: { page, sort },
  });

  return {
    comments: res.data.data,
    nextPage: res.data.nextPage ?? undefined,
  };
};
