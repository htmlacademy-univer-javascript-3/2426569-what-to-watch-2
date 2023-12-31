// pages/SignIn.tsx
import React, {FC, useState} from 'react';
import {Footer} from '../../components/footer/footer.tsx';
import {Header} from '../../components/header';
import {InputField} from '../../components/input-field';
import {useAppDispatch} from '../../hooks/store.ts';
import {login} from '../../store/api-action.ts';
import {Navigate} from 'react-router-dom';
import {AuthStatus} from '../../types/auth-status.ts';
import {useSelector} from 'react-redux';
import {selectAuthStatus} from '../../store/user-reducer/selectors.ts';
import {RoutesLinks} from '../../routes/route-links.ts';
import {EMAIL_PATTERN} from '../../consts.ts';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const authStatus = useSelector(selectAuthStatus);

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

    if (!/[a-z]/i.test(password) || !/[0-9]/.test(password)) {
      return setError('Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character');
    }

    if (password.length < 3) {
      return setError('Password must be longer than or equal to 3 characters');
    }

    dispatch(login({email: email, password: password}));
  };

  return (
    <div className="user-page">
      <Header withoutUserBlock classNames="userData-page__head"/>
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
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
};
