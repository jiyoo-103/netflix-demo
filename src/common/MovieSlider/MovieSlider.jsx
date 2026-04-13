import React from 'react';
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import MovieCard from '../MovieCard/MovieCard';



const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Carousel
        infinite
        centerMode
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {(movies ?? []).map((movie, index) => (
          <MovieCard movie={movie} key={movie.id ?? index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;