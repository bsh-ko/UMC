import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import axios from "axios";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const [imdbId, setImdbId] = useState<string | null>(null);
  const [localizedTitle, setLocalizedTitle] = useState<string | null>(null);

  useEffect(() => {
    const fetchImdbId = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
        });
        setImdbId(response.data.imdb_id);
      } catch (error) {
        console.error("IMDB ID 가져오기 실패:", error);
      }
    };
    fetchImdbId();
  }, [movie.id]);

  useEffect(() => {
    const fetchLocalizedTitle = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
          params: { language: "ko-KR" },
        });
        setLocalizedTitle(response.data.title);
      } catch (error) {
        console.error("한국어 제목 가져오기 실패:", error);
      }
    };
    fetchLocalizedTitle();
  }, [movie.id]);

  const imdbUrl = imdbId
    ? `https://www.imdb.com/title/${imdbId}`
    : `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4">
      <div className="relative flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden ring-1 ring-black/10">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
        >
          &times;
        </button>

        {/* 영화 포스터 */}
        {movie.poster_path && (
          <div className="w-full md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none shadow-lg"
            />
          </div>
        )}

        {/* 영화 정보 */}
        <div className="flex flex-col justify-between p-6 md:p-8 w-full md:w-2/3">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{localizedTitle || movie.title}</h2>
            {movie.original_title && movie.original_title !== (localizedTitle || movie.title) && (
              <p className="text-gray-500 text-sm mb-2">({movie.original_title})</p>
            )}

            <p className="text-gray-600 mb-1">
              <strong>📅 개봉일:</strong> {movie.release_date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>⭐ 평점:</strong> {movie.vote_average} / 10 ({movie.vote_count}표)
            </p>
            <p className="text-gray-700 mt-2 leading-relaxed">{movie.overview}</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              🎬 IMDB에서 보기
            </a>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
