import React from 'react'
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';


const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300_and_h450_face${movie.poster_path}`
    : null;

  return (
    <div
      style={
        posterUrl
          ? { backgroundImage: `url(${posterUrl})` }
          : undefined
      }
      className="movie-card"
    >
        <div className="overlay">
            <h1>{movie.title}</h1>
            {(movie.genre_ids ?? []).map((id) => (
                <Badge key={id} bg="danger">{id}</Badge>
            ))}
            <div>{movie.vote_average}</div>
            <div>{movie.popularity}</div>
            <div>{movie.adult?'over 18':'under 18'}</div>
        </div>

    </div>
  )
}

export default MovieCard 