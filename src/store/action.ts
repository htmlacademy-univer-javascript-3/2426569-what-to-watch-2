
import { createAction } from '@reduxjs/toolkit';
import {FilmInfo} from '../types/filmInfo.ts';

export const fetchFilms = createAction<FilmInfo[]>('fetchFilms');
