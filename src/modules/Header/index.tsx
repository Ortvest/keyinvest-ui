import classNames from 'classnames';

import { ThemeToggle } from '@modules/Auth/ThemeToggle';
import { GetStartedButton } from '@modules/Header/features/GetStartedButton';
import { Navigation } from '@modules/Header/layout/Navigation';

import IconLogo from '@shared/assets/icons/IconLogo.svg';

import './styles.css';

export const Header = (): JSX.Element => {
  return (
    <header className={classNames('header')}>
      <div className={classNames('header-title')}>
        <img src={IconLogo} alt="App logo" />
        <p>KeyTrading</p>
      </div>
      <div className={classNames('header-actions')}>
        <Navigation />

        <GetStartedButton />
        <ThemeToggle />
      </div>
    </header>
  );
};
