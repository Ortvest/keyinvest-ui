import { useEffect } from 'react';

import classNames from 'classnames';

import { RootState } from '@global/store';
import { setUser } from '@global/store/slices/login.slice';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { BurgerMenu } from '@modules/Header/features/BurgerMenu';
import { GetStartedButton } from '@modules/Header/features/GetStartedButton';
import { UserIcon } from '@modules/Header/features/UserIcon';
import { Navigation } from '@modules/Header/layout/Navigation';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconLogo from '@shared/assets/icons/Emblem.svg';
import IconLogoLight from '@shared/assets/icons/logo-main-horizontal_light.svg';

import './styles.css';

import { useLocalStorage } from '@uidotdev/usehooks';

export const Header = (): JSX.Element => {
  const [theme] = useLocalStorage('theme', 'light');
  const isDark = theme === 'dark';

  const { user, isAuth } = useTypedSelector((state: RootState) => state.userReducer);

  const dispatch = useTypedDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  return (
    <header className={classNames('header')}>
      <div className={classNames('header-title')}>
        <img className={classNames('header-logo')} src={isDark ? IconLogoLight : IconLogo} alt="App logo" />
      </div>
      <div className={classNames('header-actions')}>
        <Navigation />
        {isAuth ? (
          <div className={classNames('header-avatar')}>
            <UserIcon username={user?.username} />
          </div>
        ) : (
          <GetStartedButton />
        )}
        <BurgerMenu />
        <ThemeToggle />
      </div>
    </header>
  );
};
