import {Review} from './review';

interface AddReviewResponse {
  data: Review;
  backToFilm: () => void;
}

export default AddReviewResponse;
