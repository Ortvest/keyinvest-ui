import classNames from 'classnames';

import CloseIcon from '@shared/assets/icons/close.svg';
import MenuIcon from '@shared/assets/icons/menu.svg';

import './styles/styles.css';

interface BurgerIconProps {
  isOpen: boolean;
}

export const BurgerIcon = ({ isOpen }: BurgerIconProps): JSX.Element => {
  return (
    <div className="burger-icon-container">
      <img src={MenuIcon} alt="Open menu" className={classNames('burger-icon', { 'burger-icon-hidden': isOpen })} />
      <img src={CloseIcon} alt="Close menu" className={classNames('burger-icon', { 'burger-icon-hidden': !isOpen })} />
    </div>
  );
};
