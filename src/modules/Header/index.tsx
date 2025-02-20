import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { GetStartedButton } from '@modules/Header/features/GetStartedButton';
import { Navigation } from '@modules/Header/layout/Navigation';

import IconLogo from '@shared/assets/icons/IconLogo.svg';

import './styles.css';

export const Header = (): JSX.Element => {
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className={classNames('header')}>
      <div className={classNames('header-title')}>
        <img src={IconLogo} alt="App logo" />
        <p>KeyTrading</p>
      </div>
      <div className={classNames('header-actions')}>
        <Navigation />

        {user ? (
          <div className="user-info">
            <img src={user.avatar} alt="User avatar" className="user-avatar" />
            <p>{user.name}</p>
          </div>
        ) : (
          <GetStartedButton />
        )}

        <ThemeToggle />
      </div>
    </header>
  );
};
