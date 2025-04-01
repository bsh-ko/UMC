import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <NavLink to="/movies/popular" className="hover:text-yellow-300">
        🔥 인기 영화
      </NavLink>
      <NavLink to="/movies/upcoming" className="hover:text-yellow-300">
        🎬 개봉 예정
      </NavLink>
      <NavLink to="/movies/top_rated" className="hover:text-yellow-300">
        ⭐ 평점 높은
      </NavLink>
      <NavLink to="/movies/now_playing" className="hover:text-yellow-300">
        🎥 상영 중
      </NavLink>
    </nav>
  );
}
