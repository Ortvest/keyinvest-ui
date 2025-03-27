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
    <article className={classNames('benefits-items')}>
      <figure className={classNames('benefits-icon')}>
        <img src={icon} alt={alt} />
      </figure>

      <h3 id={`benefit-title-${title.replace(/\s+/g, '-').toLowerCase()}`} className={classNames('benefits-title')}>
        {title}
      </h3>

      <p className={classNames('benefits-description')}>{description}</p>
    </article>
  );
};
