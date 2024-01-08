import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import reviews from '../../../mocs/review.ts';
import {getDateString} from '../../../utils/time-format.ts';
import {Reviews} from './reviews';

describe('Reviews', () => {
  const mockReviews = reviews;

  test('renders reviews with correct content', () => {
    render(
      <MemoryRouter>
        <Reviews reviews={mockReviews}/>
      </MemoryRouter>
    );

    const reviewQuotes = screen.getAllByTestId('review-quote');
    expect(reviewQuotes).toHaveLength(mockReviews.length);

    mockReviews.forEach((review, index) => {
      const reviewText = screen.getByText(review.comment);
      const reviewAuthor = screen.getByText(review.user);
      const reviewDate = screen.getByText(getDateString(new Date(review.date)));
      const reviewRating = screen.getByText(`${review.rating}`);

      expect(reviewText).toBeInTheDocument();
      expect(reviewAuthor).toBeInTheDocument();
      expect(reviewDate).toBeInTheDocument();
      expect(reviewRating).toBeInTheDocument();
      expect(reviewQuotes[index]).toBeInTheDocument();
    });
  });

  test('renders "Комментариев еще нет..." message when there are no reviews', () => {
    render(
      <MemoryRouter>
        <Reviews reviews={[]}/>
      </MemoryRouter>
    );

    const noReviewsMessage = screen.getByText('Комментариев еще нет...');
    expect(noReviewsMessage).toBeInTheDocument();
  });
});
