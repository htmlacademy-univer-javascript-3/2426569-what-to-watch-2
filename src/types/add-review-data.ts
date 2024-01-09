export interface AddReviewData {
  comment: string;
  rating: number;
  filmId: string;
  backToFilm: () => void;
}
