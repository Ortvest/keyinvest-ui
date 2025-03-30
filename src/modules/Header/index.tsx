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

import IconLogo from '@shared/assets/icons/IconLogo.svg';

import './styles.css';

export const Header = (): JSX.Element => {
  const user = useTypedSelector((state: RootState) => state.login.user);
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
        <img src={IconLogo} alt="App logo" />
        <p>KeyTrading</p>
      </div>
      <div className={classNames('header-actions')}>
        <Navigation />
        {user ? <UserIcon email={user.email} /> : <GetStartedButton />}
        <BurgerMenu />
        <ThemeToggle />
      </div>
    </header>
  );
};
