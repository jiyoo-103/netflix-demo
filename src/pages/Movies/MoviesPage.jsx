import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import './MoviesPage.css';

const Movies = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('popularity.desc');
  const [genreFilter, setGenreFilter] = useState('all');
  const keyword = query.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genres = [] } = useMovieGenreQuery();
  const movies = useMemo(() => data?.results ?? [], [data?.results]);

  const visibleMovies = useMemo(() => {
    const filteredMovies =
      genreFilter === 'all'
        ? movies
        : movies.filter((movie) => (movie.genre_ids ?? []).includes(Number(genreFilter)));

    const sortedMovies = [...filteredMovies];
    sortedMovies.sort((a, b) => {
      if (sortOption === 'popularity.asc') return a.popularity - b.popularity;
      if (sortOption === 'rating.desc') return b.vote_average - a.vote_average;
      if (sortOption === 'rating.asc') return a.vote_average - b.vote_average;
      return b.popularity - a.popularity;
    });

    return sortedMovies;
  }, [movies, genreFilter, sortOption]);

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" style={{ width: '5rem', height: '5rem' }} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row className="align-items-end g-3 mb-3">
        <Col md={6} lg={4}>
          <Form.Label className="text-light">장르 필터</Form.Label>
          <Form.Select
            value={genreFilter}
            onChange={(event) => setGenreFilter(event.target.value)}
            aria-label="genre filter"
          >
            <option value="all">전체 장르</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6} lg={4}>
          <Form.Label className="text-light">정렬</Form.Label>
          <Form.Select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            aria-label="sort option"
          >
            <option value="popularity.desc">인기순 (높은 순)</option>
            <option value="popularity.asc">인기순 (낮은 순)</option>
            <option value="rating.desc">평점순 (높은 순)</option>
            <option value="rating.asc">평점순 (낮은 순)</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="g-3">
        {visibleMovies.map((movie) => (
          <Col key={movie.id} lg={4} xs={12}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      {visibleMovies.length === 0 && (
        <Alert variant="secondary" className="mt-4 text-center">
          검색 결과가 없습니다.
        </Alert>
      )}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages || 0}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </Container>
  );
};

export default Movies;