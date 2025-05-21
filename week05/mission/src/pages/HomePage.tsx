import { useEffect, useState, useRef, useCallback } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpModal from "../components/LpCard/LpModal";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // API 호출 관련 상태
  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
    refetch,
  } = useGetInfiniteLpList(5, debouncedSearch, order === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc);

  // 무한 스크롤 관련 상태
  const { ref, inView } = useInView({ threshold: 0 });

  // 페이지 로드 관련 상태
  const isLoadingRef = useRef(false);
  const [showModal, setShowModal] = useState(false);

  // 마지막 페이징 시간 추적 (최적화를 위해)
  const lastFetchTimeRef = useRef<number>(0);

  // inView 상태를 throttle로 제어
  const shouldFetchRef = useRef(false);
  const throttledFetch = useThrottle(inView, 3000);

  // 데이터 페칭 로직
  const fetchMoreData = useCallback(() => {
    if (!hasNextPage || isFetching || isLoadingRef.current) {
      return;
    }

    const now = Date.now();
    // 1초 간격 유지
    if (now - lastFetchTimeRef.current < 1000) {
      return;
    }

    console.log("🔥 throttled inView 트리거됨:", new Date().toLocaleTimeString());
    isLoadingRef.current = true;
    lastFetchTimeRef.current = now;

    fetchNextPage().finally(() => {
      isLoadingRef.current = false;
    });
  }, [hasNextPage, isFetching, fetchNextPage]);

  // throttledFetch가 true로 변경될 때만 fetchMoreData 호출
  useEffect(() => {
    if (throttledFetch && hasNextPage && !isFetching) {
      fetchMoreData();
    }
  }, [throttledFetch, hasNextPage, isFetching, fetchMoreData]);

  // 정렬 순서가 변경되면 refetch
  useEffect(() => {
    refetch();
  }, [order, refetch]);

  // 에러 처리
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="relative container mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full sm:w-96 px-4 py-2 border rounded-lg shadow-md"
        />
        <div className="flex w-full sm:w-auto justify-center sm:justify-start">
          <div className="flex border rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={() => setOrder("asc")}
              className={`cursor-pointer px-6 py-3 rounded-l-lg font-semibold text-lg transition-colors duration-300 ease-in-out ${
                order === "asc"
                  ? "bg-white text-black border-r-0 border-black"
                  : "bg-black text-white border-r-2 border-black"
              } hover:bg-gray-200`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder("desc")}
              className={`cursor-pointer px-6 py-3 rounded-r-lg font-semibold text-lg transition-colors duration-300 ease-in-out ${
                order === "desc"
                  ? "bg-white text-black border-l-0 border-black"
                  : "bg-black text-white border-l-2 border-black"
              } hover:bg-gray-200`}
            >
              최신순
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-6">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={5} />}
      </div>

      {/* 무한 스크롤을 위한 ref 추가 */}
      <div ref={ref} className="h-2"></div>

      {/* 디버그 정보 표시 (개발 중에만 사용) */}
      {/* {process.env.NODE_ENV !== "production" && (
        <div className="fixed top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded text-sm z-50">
          <div>inView: {inView.toString()}</div>
          <div>throttledFetch: {throttledFetch.toString()}</div>
          <div>isLoading: {isLoadingRef.current.toString()}</div>
          <div>isFetching: {isFetching.toString()}</div>
          <div>hasNextPage: {hasNextPage?.toString()}</div>
          <div>lastFetch: {new Date(lastFetchTimeRef.current).toLocaleTimeString()}</div>
        </div>
      )} */}

      {/* 오른쪽 하단 + 버튼 */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-pink-500 text-white text-3xl rounded-full shadow-lg hover:bg-pink-600 z-40"
      >
        +
      </button>

      {/* LP 작성 모달 */}
      {showModal && <LpModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default HomePage;
