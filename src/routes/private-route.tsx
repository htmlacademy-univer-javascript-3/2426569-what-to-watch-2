import {Navigate} from 'react-router-dom';
import {ROUTES_LINKS} from './route-links.ts';
import React from 'react';

type PrivateRouteProps = {
  hasAccess?: boolean;
  children: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({hasAccess = false, children}: PrivateRouteProps) => (
  hasAccess ? children : <Navigate to={ROUTES_LINKS.SING_IN} />
);

export default PrivateRoute;
