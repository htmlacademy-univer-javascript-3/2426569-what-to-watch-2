import React, {Fragment, memo} from 'react';
import {Logo} from './logo';
import {UserBlock} from './user-block';


type Props = {
  breadcrumbs?: React.JSX.Element;
  pageTitle?: React.JSX.Element;
  classNames?: string;
  withoutUserBlock?: boolean;
}

export function HeaderComponent({breadcrumbs, classNames, pageTitle, withoutUserBlock = false}: Props) {
  return (
    <Fragment>
      <h1 className="visually-hidden">WTW</h1>
      <header className={`page-header ${classNames ?? ''}`}>
        <Logo/>
        {pageTitle}
        {breadcrumbs}
        {!withoutUserBlock && <UserBlock/>}
      </header>
    </Fragment>
  );
}

export const Header = memo(HeaderComponent);
