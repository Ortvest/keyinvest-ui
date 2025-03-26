import classNames from 'classnames';

import './styles/styles.css';

interface PlanCardProps {
  name: string;
  title: string;
  price: string;
  details?: boolean;
}

export const PlanCard = ({ name, title, price, details = false }: PlanCardProps): JSX.Element => {
  return (
    <div className={classNames('plan-section-item')}>
      <p className={classNames('plan-section-name')}>{name}</p>
      <h3 className={classNames('plan-section-title')}>{title}</h3>
      <p className={classNames('plan-section-includes')}>Includes</p>
      <ul className={classNames('plan-includes-items')}>
        <li>Demo strategy: 1 request</li>
        <li>Portfolio analysis</li>
        <li>Al-investment assistant (chat with Al)</li>
      </ul>
      {!details && <div style={{ marginTop: '21px' }}></div>}
      {details && <p className={classNames('plan-details')}>Show more</p>}
      <p className={classNames('plan-section-price')}>{price}</p>
      <div className={classNames('plan-button-link')}>
        <button type="button" className={classNames('plan-section-button')}>
          <p>Try now</p>
        </button>
        <p className={classNames('plan-link')}>Compare features.</p>
      </div>
    </div>
  );
};
