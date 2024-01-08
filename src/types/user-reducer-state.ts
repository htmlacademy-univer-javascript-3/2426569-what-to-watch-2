import {AuthStatus} from './auth-status.ts';
import {FilmInfo} from './film-info.ts';
import {UserData} from './user-data.ts';

export interface UserReducerState {
  userData: UserData | null;
  authStatus: AuthStatus;
  favoriteFilms: FilmInfo[];
  favoriteCount: number;
}
