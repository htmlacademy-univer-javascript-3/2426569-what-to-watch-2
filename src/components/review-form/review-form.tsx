import {ChangeEvent, FormEvent, Fragment, memo, useCallback, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MAX_FILM_RATING, MAX_LENGTH_REVIEW, MIN_LENGTH_REVIEW} from '../../consts.ts';
import {useAppDispatch} from '../../hooks/store.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import {addReview} from '../../store/api-action.ts';
import {WrapperBlocker} from './form-blocker-component.tsx';

export interface ReviewFields {
  rating: string;
  comment: string;
}

const initialState: ReviewFields = {
  rating: '',
  comment: '',
};

interface ReviewFormProps {
  filmId: string;
}

export function ReviewFormComponent({filmId}: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }, [formData]);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const addRequest = {
        comment: formData.comment,
        rating: Number(formData.rating),
        filmId: filmId,
        backToFilm: () => navigate(RoutesLinks.Film.replace(':id', filmId))
      };
      setIsBlocked(true);
      dispatch(addReview(addRequest)).finally(() => {
        setIsBlocked(false);
      });
    },
    [dispatch, filmId, navigate, formData]
  );

  const submitIsDisabled = useMemo(() => Number(formData.rating) === 0
      || isBlocked
      || !formData.comment
      || formData.comment.length < MIN_LENGTH_REVIEW
      || formData.comment.length > MAX_LENGTH_REVIEW, [formData, isBlocked]);


  return (
    <form className="add-review__form" onSubmit={handleSubmit}>
      <WrapperBlocker isBlock={isBlocked}>
        <div className="rating">
          <div className="rating__stars">
            {
              Array.from({length: MAX_FILM_RATING}).map((_, index) => {
                const value = MAX_FILM_RATING - index;
                return (
                  <Fragment key={value}>
                    <input
                      className="rating__input"
                      id={`star-${value}`}
                      checked={Number(formData.rating) === value}
                      type="radio"
                      name="rating"
                      value={`${value}`}
                      onChange={handleChange}
                    />
                    <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
                  </Fragment>
                );
              })
            }
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="comment"
            id="comment"
            value={formData.comment}
            placeholder="Review text"
            onChange={handleChange}
          />
          <div className="add-review__submit">
            <button disabled={submitIsDisabled} className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </WrapperBlocker>
    </form>
  );
}

export const ReviewForm = memo(ReviewFormComponent);
