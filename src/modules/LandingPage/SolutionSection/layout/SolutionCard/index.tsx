import classNames from 'classnames';

import { LendingButton } from '@modules/LandingPage/shared/LendingButton';

import './styles/styles.css';

interface SolutionCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export const SolutionCard = ({ image, alt, title, description, reverse = false }: SolutionCardProps): JSX.Element => (
  <div className={classNames('solution-card', { 'reverse-order': reverse })}>
    <div className={classNames('market-title-info')}>
      <div className={classNames('market-text')}>
        <h2 className={classNames('market-main-text')}>KeyInvest – AI</h2>
        <h2 className={classNames('market-title')}>{title}</h2>
      </div>
      <div className={classNames('market-text-discripton')}>
        <p>{description}</p>
      </div>
      <div className={classNames('solution-line-div')}></div>
      <div>
        <LendingButton title="Learn more" />
      </div>
    </div>
    <img className={classNames('target-img')} src={image} alt={alt} />
  </div>
);
