import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MovieSlideSection from '../MovieSlideSection/MovieSlideSection';
import './PopularMovieSlide.style.css';

const PopularMovieSlide = () => {
  const query = usePopularMoviesQuery();
  return (
    <div className="popular-movie-slide">
      <MovieSlideSection title="Popular Movies" {...query} />
    </div>
  );
};

export default PopularMovieSlide;
