import './404.css';

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
      </p><a href="/#" rel="noreferrer noopener">Домой</a>
    </div>
  </div>
);
