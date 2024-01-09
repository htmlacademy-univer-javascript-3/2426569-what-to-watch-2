import React, {FC, useState} from 'react';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header';
import {InputField} from '../../components/input-field';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {login} from '../../store/api-action';
import {Navigate} from 'react-router-dom';
import {AuthStatus} from '../../types/auth-status';
import {selectAuthStatus} from '../../store/user-reducer/selectors';
import {RoutesLinks} from '../../routes/route-links';
import {EMAIL_PATTERN} from '../../consts';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={RoutesLinks.Main}/>;
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      return setError('Please enter a valid email address');
    }

    if (!/[\w]/i.test(password) || !/[\d]/.test(password)) {
      return setError('Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character');
    }

    if (password.length < 3) {
      return setError('Password must be longer than or equal to 3 characters');
    }

    dispatch(login({email: email, password: password}));
  };

  return (
    <div className="user-page">
      <Header withoutUserBlock classNames="user-page__head"/>
      {
        error && (
          <div className="sign-in__message">
            {error}
          </div>
        )
      }

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <InputField
              classPrefix="sign-in"
              type="email"
              placeholder="Email address"
              name="user-email"
              id="user-email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputField
              classPrefix="sign-in"
              type="password"
              placeholder="Password"
              name="user-password"
              id="user-password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" data-testid={'sign-in-btn'}>
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
};
