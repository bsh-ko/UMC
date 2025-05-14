import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../types/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpModal from "../components/LpCard/LpModal";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const {
    data: lps,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError,
    refetch,
  } = useGetInfiniteLpList(5, search, order === "desc" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc);
  const { ref, inView } = useInView({ threshold: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    refetch();
  }, [order, refetch]);

  useEffect(() => {
    if (search === "") return;
    const timer = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, refetch]);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="relative container mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
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
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      {/* 무한 스크롤을 위한 ref 추가 */}
      <div ref={ref} className="h-2"></div>

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
