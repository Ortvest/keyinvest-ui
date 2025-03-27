import classNames from 'classnames';

import { LandingButton } from '@modules/LandingPage/shared/LandingButton';

import './styles/styles.css';

interface SolutionCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export const SolutionCard = ({ image, alt, title, description, reverse = false }: SolutionCardProps): JSX.Element => (
  <article className={classNames('solution-card', { 'reverse-order': reverse })}>
    <div className={classNames('market-title-info')}>
      <div className={classNames('market-text')}>
        <h2 className={classNames('market-main-text')}>KeyInvest – AI</h2>
        <h2 className={classNames('market-title')}>{title}</h2>
      </div>
      <section className={classNames('market-text-discripton')}>
        <p>{description}</p>
      </section>
      <div className={classNames('solution-line-div')}></div>

      <LandingButton title="Learn more" />
    </div>
    <figure className={classNames('target-img')}>
      <img src={image} alt={alt} />
    </figure>
  </article>
);
