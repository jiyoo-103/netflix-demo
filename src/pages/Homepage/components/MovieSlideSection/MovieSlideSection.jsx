import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './MovieSlideSection.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieSlideSection = ({ title, data, isLoading, isError, error }) => {
  if (isLoading) {
    return <h1 className="movie-slide-section__status">Loading...</h1>;
  }
  if (isError) {
    return (
      <Alert variant="danger" className="movie-slide-section__alert">
        {error?.message}
      </Alert>
    );
  }

  return (
    <section className="movie-slide-section" aria-label={title}>
      <h3 className="movie-slide-section__title">{title}</h3>
      <Carousel
        infinite
        centerMode
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={movie.id ?? index} />
        ))}
      </Carousel>
    </section>
  );
};

export default MovieSlideSection;
