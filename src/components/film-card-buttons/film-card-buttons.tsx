import {memo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/store.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import {toggleFavorite} from '../../store/api-action.ts';
import {selectAuthStatus, selectFavoriteCount} from '../../store/user-reducer/selectors.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {Icon} from '../icon/icon.tsx';
import {ICONS} from '../icon/icons.ts';
import {FilmCardButton, FilmCardLinkButton} from './film-card-link-button.tsx';

interface FilmCardButtonsParams {
  filmId: string;
  isFavorite: boolean;
  withReview?: boolean;
}

function FilmCardButtonsComponent({withReview = false, isFavorite, filmId}: FilmCardButtonsParams) {
  const isAuth = useSelector(selectAuthStatus) === AuthStatus.Auth;
  const favoriteCount = useSelector(selectFavoriteCount);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleToggleFavoriteClick = useCallback(() => {
    if (!isAuth) {
      navigate(RoutesLinks.AddReview.replace(':id', filmId));
    } else {
      dispatch(toggleFavorite({status: !isFavorite, filmId: filmId.toString()}));
    }
  }, [dispatch, navigate, filmId, isAuth, isFavorite]);

  return (
    <div className="film-card__buttons">
      <FilmCardLinkButton
        title={'Play'}
        classNames={'btn--play'}
        icon={<Icon {...ICONS.PLAY_START}/>}
        toLink={RoutesLinks.Player.replace(':id', filmId)}
      />

      <FilmCardButton
        title={'My list'}
        classNames={'btn--list'}
        icon={isFavorite ? <Icon {...ICONS.IN_LIST}/> : <Icon {...ICONS.ADD_LIST}/>}
        onClick={handleToggleFavoriteClick}
      >
        <span className="film-card__count">{favoriteCount}</span>
      </FilmCardButton>

      {withReview && isAuth && (
        <FilmCardLinkButton
          toLink={RoutesLinks.AddReview.replace(':id', filmId)}
          title={'Add review'}
        />
      )}
    </div>
  );
}

export const FilmCardButtons = memo(FilmCardButtonsComponent);
