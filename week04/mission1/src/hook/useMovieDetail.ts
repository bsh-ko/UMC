import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";
import { Credits } from "../types/movieCredit";

export const useFetchMovieDetail = (movieId: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Credits["cast"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        const castRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        setMovie(movieRes.data);
        setCast(castRes.data.cast.slice(0, 6));
      } catch (e) {
        setError("영화 정보를 불러오는 중 오류가 발생했어요 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return { movie, cast, loading, error };
};
