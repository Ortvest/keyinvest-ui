import classNames from 'classnames';

import './styles/styles.css';

interface PlanCardProps {
  name: string;
  title: string;
  price: string;
  details?: boolean;
  features: string[];
}

export const PlanCard = ({ name, title, price, details = false, features }: PlanCardProps): JSX.Element => {
  return (
    <article className={classNames('plan-section-item')}>
      <p className={classNames('plan-section-name')}>{name}</p>
      <h3 className={classNames('plan-section-title')}>{title}</h3>
      <section>
        <p className={classNames('plan-section-includes')}>Includes</p>
        <ul className={classNames('plan-includes-items')}>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </section>
      {!details && <div style={{ marginTop: '21px' }}></div>}
      {details && <p className={classNames('plan-details')}>Show more</p>}
      <p className={classNames('plan-section-price')}>{price}</p>
      <div className={classNames('plan-button-link')}>
        <button type="button" className={classNames('plan-section-button')}>
          <p>Try now</p>
        </button>
        <a href="#" className={classNames('plan-link')}>
          Compare features.
        </a>
      </div>
    </article>
  );
};
