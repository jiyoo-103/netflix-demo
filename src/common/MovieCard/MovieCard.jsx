import React from 'react'
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj?.name;
    });

    return genreNameList.filter(Boolean);
  };

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage:
          'url(' +
          `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}` +
          ')',
      }}
    >
      <div className="overlay p-2">
        <div>
          <h1 className="movie-card__title">{movie.title}</h1>
          <div className="movie-card__genres">
            {showGenre(movie.genre_ids ?? []).map((genre, index) => (
              <Badge bg="danger" key={index} className="me-1">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        <div className="movie-card__meta mt-2">
          <img src="/IMDB.png" alt="IMDB" width={18} className="me-1" />
          <span>{movie.vote_average}</span>
          {movie.adult ? (
            <img src="/over18.svg" alt="over 18" width={18} className="me-1" />
          ) : (
            <img src="/under18.svg" alt="under 18" width={18} className="me-1" />
          )}
          <span>{Math.round(movie.popularity)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard 