import {Link} from 'react-router-dom';
import {ROUTES_LINKS} from '../../routes/consts.ts';

export function Logo() {
  return (
    <div className="logo">
      <Link to={ROUTES_LINKS.MAIN} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
