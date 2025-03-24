import classNames from 'classnames';

import { RootState } from '@global/store';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { GetStartedButton } from '@modules/Header/features/GetStartedButton';
import { Navigation } from '@modules/Header/layout/Navigation';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconLogo from '@shared/assets/icons/IconLogo.svg';

import './styles.css';

export const Header = (): JSX.Element => {
  const user = useTypedSelector((state: RootState) => state.login.user);

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
            <span>{user.username}</span>
          </div>
        ) : (
          <GetStartedButton />
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};
