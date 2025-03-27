import classNames from 'classnames';

import Triangle from '@shared/assets/icons/triangle.svg';

import './styles/styles.css';

interface FaqCardsProps {
  title: string;
  description: string;
}

export const FaqCards = ({ title, description }: FaqCardsProps): JSX.Element => {
  return (
    <details className={classNames('faq-section-item')}>
      <summary className={classNames('faq-section-title')}>
        <p>{title}</p>
        <img src={Triangle} alt="Expand" className={classNames('faq-section-icon')} />
      </summary>
      <div className={classNames('faq-section-content')}>
        <p className={classNames('faq-section-description')}>{description}</p>
      </div>
    </details>
  );
};
