import { useParams } from "react-router-dom";
import useCustomFetch from "../hook/useCustomFetch";
import { Actor, Credits } from "../types/movieCredit";

interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieError,
  } = useCustomFetch<MovieDetail>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`);

  const {
    data: credit,
    isLoading: creditLoading,
    isError: creditError,
  } = useCustomFetch<Credits>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`);

  if (movieLoading || creditLoading) return <div className="flex justify-center h-screen items-center">로딩중...</div>;

  if (movieError || creditError) return <div className="text-red-500 text-center">에러 발생</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie?.title}
            className="rounded-lg shadow-lg w-full"
          />

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie?.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{movie?.overview}</p>
            <p>
              <strong>개봉일:</strong> {movie?.release_date}
            </p>
            <p>
              <strong>평점:</strong> ⭐ {movie?.vote_average} / 10
            </p>
            <p>
              <strong>러닝타임:</strong> ⏳ {movie?.runtime}분
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              {movie?.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">출연진</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {credit?.cast.slice(0, 6).map((actor: Actor) => (
              <div key={actor.id} className="text-center">
                <img
                  className="w-28 h-28 object-cover rounded-full mx-auto"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                      : "https://via.placeholder.com/100x100"
                  }
                  alt={actor.name}
                />
                <p className="mt-2 font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
