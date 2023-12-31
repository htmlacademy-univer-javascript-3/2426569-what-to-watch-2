import {Link, useNavigate} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links.ts';
import {AuthStatus} from '../../types/auth-status.ts';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../hooks/store.ts';
import {logout} from '../../store/api-action.ts';
import {selectAuthStatus, selectUserData} from '../../store/user-reducer/selectors.ts';

export function UserBlock() {
  const isAuth = AuthStatus.Auth === useSelector(selectAuthStatus);
  const userData = useSelector(selectUserData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate(RoutesLinks.Main);
  };

  return (
    <ul className="user-block">
      {
        isAuth && (
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={userData?.avatarUrl} alt="User avatar" width="63" height="63"/>
            </div>
          </li>
        )
      }

      <li className="user-block__item">
        {
          isAuth ? (
            <Link to={RoutesLinks.Main} onClick={handleLogoutClick} className="user-block__link">Sign out</Link>
          ) : (
            <Link to={RoutesLinks.SingIn} className="user-block__link">Sign in</Link>
          )
        }
      </li>

    </ul>
  );
}
