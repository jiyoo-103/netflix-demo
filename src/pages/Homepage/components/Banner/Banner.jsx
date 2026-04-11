import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import './Banner.css';

const BANNER_IMAGE_URL =
  'https://media.themoviedb.org/t/p/w1066_and_h600_face/u53UYu5XG2hNgWGvs3xGhAVzypl.jpg';

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  return (
    <div
      className="banner"
      style={{
        backgroundImage: 'url(' + BANNER_IMAGE_URL + ')',
      }}
    >
      {isLoading && <p className="banner__status">Loading....</p>}
      {isError && (
        <Alert variant="danger" className="banner__alert">
          {error?.message ?? '영화 정보를 불러오지 못했습니다. .env에 REACT_APP_API_KEY를 확인하세요.'}
        </Alert>
      )}
      {!isLoading && !isError && data && <span className="banner__label"></span>}
      <div className='text-white banner-text-area'>
        <h1>{data?.results[0].title}</h1>
      <p>{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
