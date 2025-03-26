import classNames from 'classnames';

import { LendingButton } from '@modules/LandingPage/shared/LendingButton';

import AiRobot from '@shared/assets/images/ai.webp';

import './styles/styles.css';

export const MainSection = (): JSX.Element => {
  return (
    <section className={classNames('main-section-wrapper')}>
      <div className={classNames('main-title')}>
        <div className={classNames('main-text')}>
          <h1 className={classNames('main-text-h1')}>KeyInvest – AI</h1>
          <p className={classNames('driven-title')}>Driven Investment Insights</p>
        </div>
        <div className={classNames('text-discripton')}>
          <p>Our AI analyzes the market and suggests the most favorable investments: stocks, rates and more.</p>
        </div>
        <div className={classNames('main-line')}></div>
        <div>
          <LendingButton title={'Get Started'} />
        </div>
      </div>
      <img className={classNames('photo-ai')} src={AiRobot} alt="ai icon" />
    </section>
  );
};
