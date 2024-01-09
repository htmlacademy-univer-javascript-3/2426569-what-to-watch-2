import './404.css';
import {Link} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links.ts';

export const NotFoundPage = () => (
  <div className="not_found_page">
    <h1>404</h1>
    <div className="cloak__wrapper">
      <div className="cloak__container">
        <div className="cloak"></div>
      </div>
    </div>
    <div className="info">
      <h2>Страница не найдена</h2>
      <p>Мы старались-старались, но ничего не нашли, может проблема в вас).
      </p><Link to={RoutesLinks.Main} rel="noreferrer noopener">Домой</Link>
    </div>
  </div>
);
