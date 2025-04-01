import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-[#dda5e3] mb-6">영화 애호가를 위한 최고의 사이트</h1>
      <p className="text-lg mb-8">인기 영화, 개봉 예정작, 평점 높은 영화 등을 둘러보세요!</p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/movies/popular"
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#c294c7] transition-all duration-200"
        >
          인기 영화 보기
        </Link>
        <Link
          to="/movies/upcoming"
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#c294c7] transition-all duration-200"
        >
          개봉 예정작 보기
        </Link>
        <Link
          to="/movies/top-rated"
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#c294c7] transition-all duration-200"
        >
          평점 높은 영화 보기
        </Link>
        <Link
          to="/movies/now_playing"
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#c294c7] transition-all duration-200"
        >
          상영 중인 영화 보기
        </Link>
      </div>
    </div>
  );
}
