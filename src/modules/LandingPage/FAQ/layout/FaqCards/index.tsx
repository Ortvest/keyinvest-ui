import { useState } from 'react';

import classNames from 'classnames';

import Triangle from '@shared/assets/icons/triangle.svg';

import './styles/styles.css';

interface FaqCardsProps {
  title: string;
  description: string;
}

export const FaqCards = ({ title, description }: FaqCardsProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleHandler = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={classNames('faq-section-item', { open: isOpen })} onClick={onToggleHandler}>
      <div className={classNames('faq-section-title')}>
        <p>{title}</p>
        <img src={Triangle} alt="triangle icon" className={classNames('faq-section-icon', { rotated: isOpen })} />
      </div>
      {isOpen && <p className={classNames('faq-section-description')}>{description}</p>}
    </div>
  );
};
