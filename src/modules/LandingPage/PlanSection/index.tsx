import classNames from 'classnames';

import { PlanCard } from '@modules/LandingPage/PlanSection/layout/PlanCards';
import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import './styles/styles.css';

const PlanData = [
  {
    name: 'Free',
    title: 'For individuals and teams getting started.',
    price: '0 $',
    details: false,
    features: ['Demo strategy: 1 request', 'Portfolio analysis', 'AI-investment assistant (chat with AI)'],
  },
  {
    name: 'Pro',
    title: 'For power users and growing teams.',
    price: '35 $',
    details: true,
    features: [
      'Demo strategy: 2-3 request',
      'Paid helpdesk (support)',
      'The ability to inscribe your investment goals',
    ],
  },
  {
    name: 'Elite',
    title: 'For large teams and sub-accounts.',
    price: '80 $',
    details: true,
    features: [
      'Demo strategy: unlimited',
      'Paid helpdesk (prioritized)',
      'The ability to inscribe your investment goals',
    ],
  },
];

export const PlanSection = (): JSX.Element => {
  return (
    <section className={classNames('plan-section-wrapper')}>
      <SectionTitle title={'Power Up Your Investments – Pick the Perfect Plan'} />
      <div className={classNames('plan-section-list')}>
        {PlanData.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
};
