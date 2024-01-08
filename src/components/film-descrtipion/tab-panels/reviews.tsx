import {FC, memo, useMemo} from 'react';
import {Review} from '../../../types/review';
import {getDateString} from '../../../utils/time-format';

const ReviewComponent: FC<Review> = ({comment, user, date, rating}) => {
  const dateString = useMemo(() => getDateString(new Date(date)), [date]);
  return (
    <div className="review" data-testid={'review-quote'}>
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={dateString}>
            {dateString}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

interface ReviewsProps {
  reviews: Review[];
}

const ReviewsComponent: FC<ReviewsProps> = ({reviews}) => (
  reviews.length ? (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(reviews.length / 2, reviews.length).map((review) => (
          <ReviewComponent key={review.id} {...review} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(0, reviews.length / 2).map((review) => (
          <ReviewComponent key={review.id} {...review} />
        ))}
      </div>
    </div>
  ) : (
    <h1 style={{color: 'black'}}>Комментариев еще нет...</h1>
  )
);

export const Reviews = memo(ReviewsComponent);
