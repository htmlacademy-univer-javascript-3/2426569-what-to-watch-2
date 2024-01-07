import {FC, memo, PropsWithChildren} from 'react';

import {FilmDetailsInfo} from '../../../types/film-details-info.ts';
interface FilmDetailsItemProps {
  name: string;
}

const FilmDetailsItemComponent: FC<PropsWithChildren<FilmDetailsItemProps>> = ({
  name,
  children,
}) => (
  <p className="film-card__details-item">
    <strong className="film-card__details-name">{name}</strong>
    <span className="film-card__details-value">{children}</span>
  </p>
);

const FilmDetailsItem = memo(FilmDetailsItemComponent);

interface FilmDetailsProps {
  film: FilmDetailsInfo;
}

const FilmDetailsComponent: FC<FilmDetailsProps> = ({film}) => {
  const { genre, runTime, director, released, starring } = film;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <FilmDetailsItem name="Director">{director}</FilmDetailsItem>
        <FilmDetailsItem name="Starring">{starring.join(', ')}</FilmDetailsItem>
      </div>

      <div className="film-card__text-col">
        <FilmDetailsItem name="Run Time">{runTime}</FilmDetailsItem>
        <FilmDetailsItem name="Genre">{genre}</FilmDetailsItem>
        <FilmDetailsItem name="Released">{released}</FilmDetailsItem>
      </div>
    </div>
  );
};

export const Details = memo(FilmDetailsComponent);
