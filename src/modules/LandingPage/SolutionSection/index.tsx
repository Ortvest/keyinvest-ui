import classNames from 'classnames';

import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';
import { SolutionCard } from '@modules/LandingPage/SolutionSection/layout/SolutionCard';

import Customer from '@shared/assets/images/customer.webp';
import Target from '@shared/assets/images/target.webp';
import Total from '@shared/assets/images/total.webp';

import './styles/styles.css';

const solutionCards = [
  {
    image: Target,
    alt: 'AI icon',
    title: 'AI-Driven Market Analysis',
    description: `Our algorithm analyzes the market in real-time,
	   processing vast amounts of data to identify promising investment opportunities. `,
    reverse: false,
  },
  {
    image: Customer,
    alt: 'Customer icon',
    title: 'AI-Driven Market Analysis',
    description: ` Our algorithm analyzes the market in real-time, 
	  processing vast amounts of data to identify promising investment opportunities.`,
    reverse: true,
  },
  {
    image: Total,
    alt: 'Total icon',
    title: 'AI-Driven Market Analysis',
    description: `Our algorithm analyzes the market in real-time, 
	  processing vast amounts of data to identify promising investment opportunities.`,
    reverse: false,
  },
];

export const SolutionSection = (): JSX.Element => {
  return (
    <section className={classNames('solution-section-wrapper')}>
      <SectionTitle
        section="Solution"
        title="KeyInvest simplifies the process"
        description={`
          KeyInvest analyzes the market in real time, 
          providing data-driven recommendations on stocks, 
          brokers, and strategies—helping you invest with confidence.
        `}
      />

      <div className={classNames('solution-cards-list')}>
        {solutionCards.map((card, index) => (
          <SolutionCard
            key={index}
            image={card.image}
            alt={card.alt}
            title={card.title}
            description={card.description}
            reverse={card.reverse}
          />
        ))}
      </div>
    </section>
  );
};
