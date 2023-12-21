import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {FILM_LIST} from './mocs/filmInfo.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App filmsData={FILM_LIST} isAuth />
  </React.StrictMode>
);
