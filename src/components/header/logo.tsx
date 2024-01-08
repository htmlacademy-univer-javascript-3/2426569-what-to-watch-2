import {Link} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links';

export function Logo() {
  return (
    <div className="logo">
      <Link to={RoutesLinks.Main} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
