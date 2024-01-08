import {memo} from 'react';
import {Link} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links';

function FooterComponent() {
  return (
    <footer className="page-footer" data-testid={'page-footer'} >
      <div className="logo">
        <Link data-testid={'logo-link'} to={RoutesLinks.Main} className="logo__link logo__link--light">
          <span data-testid={'logo-letter'} className="logo__letter logo__letter--1">W</span>
          <span data-testid={'logo-letter'} className="logo__letter logo__letter--2">T</span>
          <span data-testid={'logo-letter'} className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2023 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
