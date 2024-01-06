import {ROUTES_LINKS} from '../../routes/route-links.ts';
import {Link} from 'react-router-dom';
import React from 'react';
import {Logo} from './logo.tsx';


type Props = {
  breadcrumbs?: React.JSX.Element;
  pageTitle?: React.JSX.Element;
  classNames?: string;
}

export function Header({breadcrumbs, classNames, pageTitle}: Props) {
  return (
    <header className={`page-header ${classNames ?? ''}`}>
      <Logo/>
      {pageTitle}
      {breadcrumbs}
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <Link to={ROUTES_LINKS.SING_IN} className="user-block__link">Sign out</Link>
        </li>
      </ul>
    </header>
  );
}
