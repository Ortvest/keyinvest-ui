import { useEffect, useState } from 'react';

import classNames from 'classnames';

import DarkMode from '@shared/assets/icons/DarkMode.svg';
import LightMode from '@shared/assets/icons/LightMode.svg';

import './styles/styles.css';

export const ThemeToggle = (): JSX.Element => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={classNames('theme-toggle-wrapper')}>
      <button type="button" onClick={toggleTheme} className={classNames('theme-toggle')}>
        <img src={theme === 'light' ? DarkMode : LightMode} alt={theme === 'light' ? ' dark mode' : ' light mode'} />
      </button>
    </div>
  );
};
