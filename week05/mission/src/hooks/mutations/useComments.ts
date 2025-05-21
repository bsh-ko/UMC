import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, updateComment, deleteComment } from "../../apis/comment";

// 댓글 작성
export const useAddComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => addComment(lpId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", lpId],
      });
    },
    onError: (error: Error) => {
      console.error("댓글 작성 오류", error);
    },
  });
};

// 댓글 수정
export const useUpdateComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      updateComment(lpId, commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", lpId],
      });
    },
    onError: (error: Error) => {
      console.error("댓글 수정 오류", error);
    },
  });
};

// 댓글 삭제
export const useDeleteComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", lpId],
      });
    },
    onError: (error: Error) => {
      console.error("댓글 삭제 오류", error);
    },
  });
};
