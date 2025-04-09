import { useState } from "react";
import { useParams } from "react-router-dom";
import { MovieResponse } from "../types/movie";
import useCustomFetch from "../hook/useCustomFetch";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const { data, isLoading, isError } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
  );

  if (isError) return <div className="text-red-500">에러 발생</div>;

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          disabled={page === 1}
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg disabled:bg-gray-300"
          onClick={() => setPage((prev) => prev - 1)}
        >
          {`<`}
        </button>
        <span>{page}페이지</span>
        <button className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg" onClick={() => setPage((prev) => prev + 1)}>
          {`>`}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
