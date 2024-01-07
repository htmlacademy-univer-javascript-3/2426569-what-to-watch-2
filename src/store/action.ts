
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {FilmInfo} from '../types/filmInfo.ts';

export const fetchFilms = createAsyncThunk<
  FilmInfo[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/films', async (_, { extra: api }) => {
  const { data } = await api.get<FilmInfo[]>('/films');

  return data;
});

