import classNames from 'classnames';

import { RootState } from '@global/store';


import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { BurgerMenu } from '@modules/Header/features/BurgerMenu';
import { GetStartedButton } from '@modules/Header/features/GetStartedButton';
import { UserIcon } from '@modules/Header/features/UserIcon';
import { Navigation } from '@modules/Header/layout/Navigation';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import IconLogo from '@shared/assets/icons/Emblem.svg';

import './styles.css';

export const Header = (): JSX.Element => {
  const { user, isAuth } = useTypedSelector((state: RootState) => state.userReducer);

  return (
    <header className={classNames('header')}>
      <div className={classNames('header-title')}>
        <img src={IconLogo} alt="App logo" />
      </div>
      <div className={classNames('header-actions')}>
        <Navigation />
        {isAuth ? (
          <div className={classNames('header-avatar')}>
            <UserIcon email={user?.username} />
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
