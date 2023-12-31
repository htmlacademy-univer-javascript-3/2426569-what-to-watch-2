import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import {checkAuth, fetchFavoriteFilms, fetchFilms, fetchPromo} from './store/api-action.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchPromo());
store.dispatch(fetchFilms());
store.dispatch(checkAuth());
store.dispatch(fetchFavoriteFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
