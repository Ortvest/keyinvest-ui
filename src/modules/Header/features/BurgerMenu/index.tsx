import { useState } from 'react';

import classNames from 'classnames';

import { BurgerIcon } from '@modules/Header/layout/BurgerIcon';

import './styles/styles.css';

export const BurgerMenu = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className={classNames('burger-menu')}>
      <button onClick={toggleMenu} aria-label="Toggle menu">
        <BurgerIcon isOpen={isOpen} />
      </button>

      <ul className={classNames('burger-nav', { 'is-open': isOpen })}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/services">Pricing</a>
        </li>
        <li>
          <a href="/contact">Support</a>
        </li>
      </ul>
    </nav>
  );
};
