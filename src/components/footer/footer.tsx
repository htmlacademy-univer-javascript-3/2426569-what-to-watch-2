import {Link} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links.ts';

export function Footer() {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Link to={RoutesLinks.Main} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2023 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
