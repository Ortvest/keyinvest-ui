import { useCallback, useEffect } from 'react';

import classNames from 'classnames';

import DarkModeIcon from '@shared/assets/icons/DarkMode.svg';
import LightModeIcon from '@shared/assets/icons/LightMode.svg';

import './styles/styles.css';

import { useLocalStorage } from '@uidotdev/usehooks';

export const ThemeToggle = (): JSX.Element => {
  const [theme, setTheme] = useLocalStorage('"theme"', '"light"');

  const isDark = useCallback(() => theme === 'dark', [theme]);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDark());
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setTheme(isDark() ? 'light' : 'dark');
  }, [isDark, setTheme]);

  return (
    <div className="theme-toggle-wrapper">
      <button type="button" onClick={toggleTheme} className={classNames('theme-toggle')}>
        <img src={isDark() ? LightModeIcon : DarkModeIcon} alt={isDark() ? 'Light mode' : 'Dark mode'} />
      </button>
    </div>
  );
};
