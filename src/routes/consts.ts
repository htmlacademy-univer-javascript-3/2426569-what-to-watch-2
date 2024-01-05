export const enum ROUTES_LINKS {
  MAIN = '/',
  SING_IN = '/login',
  MY_LIST = '/mylist',
  FILMS = '/films',
  FILM = '/films/:id',
  ADD_REVIEW = '/films/:id/review',
  PLAYER = '/player/:id',
  NOT_FOUND = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
