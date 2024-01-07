import { FC, memo } from 'react';
import {convertFilmRating} from '../../../utils/raiting.ts';
import {FilmDetailsInfo} from '../../../types/filmDetailsInfo.ts';

interface OverviewProps {
  film: FilmDetailsInfo;
}

const OverviewComponent: FC<OverviewProps> = ({ film }) => {
  const {
    rating,
    scoresCount,
    director,
    starring,
    description,
  } = film;

  const filmRatingLevel = convertFilmRating(rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRatingLevel}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>

        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
};

export const Overview = memo(OverviewComponent);
