import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import {AppRoutes} from './routes/app-routes';
import {selectError} from './store/app-reducer/selectors';
import 'react-toastify/dist/ReactToastify.css';
import {store} from './store/store';
import {setError} from './store/actions';

export function App() {
  const error = useSelector(selectError);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      toast(error, {
        onClose: () => {
          store.dispatch(setError(undefined));
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [error]);

  return (
    <BrowserRouter>
      <ToastContainer position={'top-right'}/>
      <ScrollToTop/>
      <AppRoutes/>
    </BrowserRouter>
  );
}
