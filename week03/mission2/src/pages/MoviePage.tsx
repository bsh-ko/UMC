import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

const API_BASE_URL = "https://api.themoviedb.org/3/movie";

export default function MoviePage() {
  const { category } = useParams<{ category: string }>(); // 🔹 현재 선택된 카테고리 가져오기
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!category) return;
      setIsPending(true);
      setIsError(false);

      try {
        const { data } = await axios.get<MovieResponse>(`${API_BASE_URL}/${category}?language=ko-KR&page=${page}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        setMovies(data.results); // 기존 리스트를 유지하려면 concat 가능
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [category, page]); // 🔹 category가 변경될 때마다 새로운 데이터 요청

  if (isError) {
    return (
      <div className="flex items-center justify-center p-6 rounded-lg bg-red-50 border border-red-200 shadow-sm my-4">
        <svg
          className="w-6 h-6 text-red-500 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="text-red-600 font-medium">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#d2ab1] transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {"<"}
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#d2ab1] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
