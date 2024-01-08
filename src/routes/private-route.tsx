import {Navigate} from 'react-router-dom';
import {RoutesLinks} from './route-links';
import React from 'react';
import {useSelector} from 'react-redux';
import {AuthStatus} from '../types/auth-status';
import {selectAuthStatus} from '../store/user-reducer/selectors';

type PrivateRouteProps = {
  children: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}: PrivateRouteProps) => {
  const isAuth = AuthStatus.Auth === useSelector(selectAuthStatus);
  return (
    isAuth ? children : <Navigate to={RoutesLinks.SingIn}/>
  );
};

export default PrivateRoute;
