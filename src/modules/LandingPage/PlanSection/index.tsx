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
  },
  {
    name: 'Pro',
    title: 'For power users and growing teams.',
    price: '35 $',
    details: true,
  },
  {
    name: 'Elite',
    title: 'For large teams and sub-accounts.',
    price: '80 $',
    details: true,
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
