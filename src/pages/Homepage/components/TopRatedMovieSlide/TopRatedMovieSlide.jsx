import React from 'react';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import MovieSlideSection from '../MovieSlideSection/MovieSlideSection';

const TopRatedMovieSlide = () => {
  const query = useTopRatedMoviesQuery();
  return <MovieSlideSection title="Top Rated Movies" {...query} />;
};

export default TopRatedMovieSlide;
