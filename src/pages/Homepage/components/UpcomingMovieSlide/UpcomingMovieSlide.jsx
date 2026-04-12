import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import MovieSlideSection from '../MovieSlideSection/MovieSlideSection';

const UpcomingMovieSlide = () => {
  const query = useUpcomingMoviesQuery();
  return <MovieSlideSection title="Upcoming Movies" {...query} />;
};

export default UpcomingMovieSlide;
