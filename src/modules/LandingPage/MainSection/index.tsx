import classNames from 'classnames';

import { LandingButton } from '@modules/LandingPage/shared/LandingButton';

import AiRobotAvif from '@shared/assets/images/ai.avif';
import AiRobot from '@shared/assets/images/ai.webp';

import './styles/styles.css';

export const MainSection = (): JSX.Element => {
  return (
    <section className={classNames('main-section-wrapper')}>
      <article className={classNames('main-title')}>
        <div className={classNames('main-text')}>
          <h1 className={classNames('main-text-h1')}>KeyInvest – AI</h1>
          <p className={classNames('driven-title')}>Driven Investment Insights</p>
        </div>
        <p className={classNames('text-discripton')}>
          Our AI analyzes the market and suggests the most favorable investments: stocks, rates and more.
        </p>
        <hr className={classNames('main-line')} />

        <LandingButton title={'Get Started'} />
      </article>

      <figure className={classNames('photo-ai')}>
        <picture>
          <source srcSet={AiRobot} type="image/webp" />
          <source srcSet={AiRobotAvif} type="image/avif" />
          <img
            className={classNames('photo-ai-img')}
            src={AiRobot}
            alt="AI-generated investment insights representation"
            loading="lazy"
            fetchPriority="high"
          />
        </picture>
      </figure>
    </section>
  );
};
