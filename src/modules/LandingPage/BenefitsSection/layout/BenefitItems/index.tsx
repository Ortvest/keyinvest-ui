import classNames from 'classnames';

import './styles/styles.css';

interface BenefitItemProps {
  icon: string;
  alt: string;
  title: string;
  description: string;
}

export const BenefitItem = ({ icon, alt, title, description }: BenefitItemProps): JSX.Element => {
  return (
    <div className={classNames('benefits-items')}>
      <div className={classNames('benefits-icon')}>
        <img src={icon} alt={alt} />
      </div>
      <div>
        <h3 className={classNames('benefits-title')}>{title}</h3>
      </div>
      <div className={classNames('benefits-description')}>
        <p>{description}</p>
      </div>
    </div>
  );
};
