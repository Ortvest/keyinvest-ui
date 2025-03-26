import classNames from 'classnames';

import { BenefitItem } from '@modules/LandingPage/BenefitsSection/layout/BenefitItems';
import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import Lock from '@shared/assets/icons/lock.svg';
import Rocket from '@shared/assets/icons/rocket.svg';
import Stroke from '@shared/assets/icons/Stroke.svg';

import './styles/styles.css';

const benefitsData = [
  {
    icon: Rocket,
    alt: 'Rocket icon',
    title: 'Smart Investment Strategies',
    description: 'Our AI-driven algorithms analyze market trends to help you make data-backed investment decisions.',
  },
  {
    icon: Lock,
    alt: 'Lock icon',
    title: 'Reliable & Secure',
    description: 'We prioritize data security and accuracy to ensure your investments are protected and well-informed.',
  },
  {
    icon: Stroke,
    alt: 'Stroke icon',
    title: 'Real-Time Market Insights',
    description: 'Stay ahead with up-to-the-minute analysis and predictions from our AI-powered system.',
  },
];

export const BenefitsSection = (): JSX.Element => {
  return (
    <section className={classNames('benefits-section-wrapper')}>
      <SectionTitle
        section="Unlock Your Investment Potential"
        title="with KeyInvest’s AI-Powered Insights"
        description="Our AI analyzes the market to help you make smarter,
		 data-driven investment decisions with confidence."
        changeColorTitle
        changeColorH2
      />

      <div className={classNames('benefits-items-list')}>
        {benefitsData.map((benefit, index) => (
          <BenefitItem key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
};
