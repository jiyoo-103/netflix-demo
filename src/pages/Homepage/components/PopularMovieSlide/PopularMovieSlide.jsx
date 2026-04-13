import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constansts/responsive';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.message}</h1>;
  }

  return (
    <div className="popular-movie-slide">
      <MovieSlider
        title="Popular Movies"
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
