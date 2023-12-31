import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/film-info.ts';
import {FilmDetailsInfo, FilmShortInfo} from '../types/film-details-info.ts';
import {Review} from '../types/review.ts';
import {AuthData} from '../types/auth-data.ts';
import {UserData} from '../types/user-data.ts';

interface ApiState {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchFilms = createAsyncThunk<
  FilmInfo[],
  undefined,
  ApiState
>('/films', async (_, {extra: api}) => {
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
>('/films/id', async (filmId: string, {extra: api}) => {
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
>('/films/id/similar', async (filmId: string, {extra: api}) => {
  const {data} = await api.get<FilmInfo[]>(`/films/${filmId}/similar`);
  return data;
});
