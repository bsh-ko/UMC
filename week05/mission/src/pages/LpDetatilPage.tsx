import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Lp } from "../types/lp";
import { Comment } from "../types/comment";
import CommentListSkeletonList from "../components/CommentCard/CommentListSkeletonList";
import { fetchComments } from "../apis/comment";

const fetchLpById = async (id: string): Promise<Lp> => {
  const response = await axios.get(`http://localhost:8000/v1/lps/${id}`);
  return response.data.data;
};

const LpDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: lp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lpDetail", id],
    queryFn: () => fetchLpById(id!),
    enabled: !!id,
  });

  const {
    data: commentPages,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id, sortOrder], // lpId는 id로, sort는 sortOrder로 수정
    queryFn: ({ pageParam = 1 }) => fetchComments(id!, pageParam, sortOrder), // lpId는 id로, sort는 sortOrder로 수정
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    enabled: !!id,
  });

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isError || !lp) return <div>Error</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-500 rounded-2xl shadow-2xl p-10 space-y-8 text-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <button onClick={() => navigate(-1)} className="cursor-pointer text-2xl transition-all duration-300">
            ◀️
          </button>
          <div className="flex gap-5">
            <button className="px-3 py-1 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300 border border-gray-300 shadow-md">
              ✏️
            </button>
            <button className="px-3 py-1 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300 border border-gray-300 shadow-md">
              🗑️
            </button>
            <button className="px-3 py-1 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300 border border-gray-300 shadow-md">
              ❤️
            </button>
          </div>
        </div>

        {/* LP Detail Section */}
        <div className="flex flex-col items-center mb-8 space-y-6">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full md:w-96 h-auto object-cover rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          />
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-extrabold text-gray-100 mb-3 tracking-tight">{lp.title}</h2>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
              {lp.content}
            </p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold text-gray-100 mb-6">댓글</h3>

          {/* 정렬 버튼 */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSortOrder("new")}
              className={`px-4 py-2 rounded-lg ${
                sortOrder === "new" ? "bg-pink-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => setSortOrder("old")}
              className={`px-4 py-2 rounded-lg ${
                sortOrder === "old" ? "bg-pink-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              오래된 순
            </button>
          </div>

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {isCommentsLoading ? (
              <CommentListSkeletonList count={5} />
            ) : (
              commentPages?.pages.map((page) =>
                page.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  >
                    <p className="text-gray-300 font-semibold">{comment.author}</p>
                    <p className="text-gray-400 text-sm mb-2">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                ))
              )
            )}
            {isFetchingNextPage && <CommentListSkeletonList count={2} />}
            <div ref={observerRef} className="h-10" />
          </div>

          {/* 댓글 작성란 (디자인만) */}
          <div className="mt-8 p-4 rounded-lg bg-gray-700 space-y-4">
            <textarea
              className="w-full p-3 rounded-md bg-gray-800 text-gray-100 resize-none"
              placeholder="댓글을 입력하세요..."
              rows={3}
              disabled
            />
            <button className="px-4 py-2 bg-pink-500 text-white rounded-md" disabled>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
