import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app.tsx';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import {fetchFilms} from './store/action.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App isAuth />
    </Provider>
  </React.StrictMode>
);
