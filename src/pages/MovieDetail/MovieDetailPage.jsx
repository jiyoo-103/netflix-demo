import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Badge, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import './MovieDetailPage.css';

const fetchMovieDetail = (id) => api.get(`/movie/${id}`).then((result) => result.data);
const fetchMovieReviews = (id) => api.get(`/movie/${id}/reviews`).then((result) => result.data);
const fetchMovieVideos = (id) => api.get(`/movie/${id}/videos`).then((result) => result.data);

const formatCurrency = (value) => {
  if (!value) return '-';
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'USD' }).format(value);
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const [expandedReviews, setExpandedReviews] = useState({});

  const { data: movie, isLoading: movieLoading, isError: movieError } = useQuery({
    queryKey: ['movie-detail', id],
    queryFn: () => fetchMovieDetail(id),
  });

  const { data: reviewData } = useQuery({
    queryKey: ['movie-reviews', id],
    queryFn: () => fetchMovieReviews(id),
  });

  const { data: videoData } = useQuery({
    queryKey: ['movie-videos', id],
    queryFn: () => fetchMovieVideos(id),
  });

  const toggleReview = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  if (movieLoading) {
    return (
      <div className="movie-detail-loading">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (movieError || !movie) {
    return <Alert variant="danger">영화 상세 정보를 불러오지 못했습니다.</Alert>;
  }

  const trailer = (videoData?.results ?? []).find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  return (
    <Container className="movie-detail-page py-4">
      <Row className="g-4">
        <Col md={4}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className="movie-detail-poster"
          />
        </Col>
        <Col md={8}>
          <h1 className="movie-detail-title">{movie.title}</h1>
          <p className="movie-detail-tagline">{movie.tagline || '태그라인 없음'}</p>
          <div className="mb-3">
            {(movie.genres ?? []).map((genre) => (
              <Badge bg="danger" className="me-2 mb-2" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <p>
            <strong>평점:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>인기도:</strong> {Math.round(movie.popularity)}
          </p>
          <p>
            <strong>개봉일:</strong> {movie.release_date || '-'}
          </p>
          <p>
            <strong>예산:</strong> {formatCurrency(movie.budget)}
          </p>
          <p className="movie-detail-overview">{movie.overview || '줄거리 정보가 없습니다.'}</p>
        </Col>
      </Row>

      <section className="movie-detail-section mt-5">
        <h3>예고편</h3>
        {trailer ? (
          <div className="movie-detail-trailer-wrapper">
            <iframe
              className="movie-detail-trailer"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="movie trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <Alert variant="secondary">등록된 예고편이 없습니다.</Alert>
        )}
      </section>

      <section className="movie-detail-section mt-5">
        <h3>리뷰</h3>
        {(reviewData?.results ?? []).length === 0 && (
          <Alert variant="secondary">등록된 리뷰가 없습니다.</Alert>
        )}
        {(reviewData?.results ?? []).slice(0, 5).map((review) => {
          const isExpanded = Boolean(expandedReviews[review.id]);
          const content = isExpanded ? review.content : review.content.slice(0, 240);
          const showToggle = review.content.length > 240;

          return (
            <article key={review.id} className="movie-review-card">
              <h5>{review.author}</h5>
              <p>
                {content}
                {!isExpanded && showToggle && '...'}
              </p>
              {showToggle && (
                <Button variant="outline-light" size="sm" onClick={() => toggleReview(review.id)}>
                  {isExpanded ? '접기' : '더보기'}
                </Button>
              )}
            </article>
          );
        })}
      </section>
    </Container>
  );
};

export default MovieDetailPage;