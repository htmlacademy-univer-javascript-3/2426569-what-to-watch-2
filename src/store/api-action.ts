import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/film-info';
import {FilmDetailsInfo, FilmShortInfo} from '../types/film-details-info';
import {Review} from '../types/review';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import AddReviewResponse from '../types/add-review-response';
import {AddReviewData} from '../types/add-review-data';

interface ApiState {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchFilms = createAsyncThunk<
  FilmInfo[],
  undefined,
  ApiState
>('/filmsDetails', async (_, {extra: api}) => {
  const {data} = await api.get<FilmInfo[]>('/films');
  return data;
});


export const checkAuth = createAsyncThunk<UserData, undefined, ApiState>(
  'userData/checkAuth',
  async (_, {extra: api}) => {
    const {data} = await api.get<UserData>('/login');
    return data;
  },
);

export const login = createAsyncThunk<
  UserData,
  AuthData,
  ApiState
>('/login', async ({email, password}, {extra: api}) => {
  const {data} = await api.post<UserData>('/login', {email, password});
  return data;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  ApiState
>('/logout', async (_, {extra: api}) => {
  await api.delete('/logout');
});

export const fetchFilm = createAsyncThunk<
  FilmDetailsInfo,
  string,
  ApiState
>('/filmsDetails/id', async (filmId: string, {extra: api}) => {
  const {data} = await api.get<FilmDetailsInfo>(`/films/${filmId}`);
  return data;
});

export const fetchFavoriteFilms = createAsyncThunk<
  FilmInfo[],
  undefined,
  ApiState
>('/favorite', async (_, {extra: api}) => {
  const {data} = await api.get<FilmInfo[]>('/favorite');
  return data;
});

export const fetchPromo = createAsyncThunk<
  FilmShortInfo,
  undefined,
  ApiState
>('/promo', async (_, {extra: api}) => {
  const {data} = await api.get<FilmShortInfo>('/promo');
  return data;
});

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  ApiState
>('/reviews', async (filmId: string, {extra: api}) => {
  const {data} = await api.get<Review[]>(`/comments/${filmId}`);
  return data;
});

export const fetchSimilar = createAsyncThunk<
  FilmInfo[],
  string,
  ApiState
>('/filmsDetails/id/similar', async (filmId: string, {extra: api}) => {
  const {data} = await api.get<FilmInfo[]>(`/films/${filmId}/similar`);
  return data;
});

export const addReview = createAsyncThunk<
  AddReviewResponse,
  AddReviewData,
  ApiState
>(
  '/comments/addReview',
  async (params, {extra: api}) => {
    const {comment, rating, filmId, backToFilm} = params;
    const {data} = await api.post<Review>(`/comments/${filmId}`, {comment, rating});
    return {data, backToFilm};
  }
);

export const toggleFavorite = createAsyncThunk<
  FilmDetailsInfo,
  { filmId: string; status: boolean },
  ApiState
>(
  'user/toggleFavorite',
  async ({filmId, status}, {extra: api}) => {
    let requestStatus = 0;
    if (status) {
      requestStatus = 1;
    }
    const {data} = await api.post<FilmDetailsInfo>(
      `/favorite/${filmId}/${requestStatus}`,
      {
        filmId,
        status,
      }
    );

    return data;
  }
);
