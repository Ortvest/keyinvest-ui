import classNames from 'classnames';

import { ProblemCard } from '@modules/LandingPage/ProblemSection/layout/ProblemCard';
import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import GraphDownArrow from '@shared/assets/icons/graph-down-arrow.svg';
import Newspaper from '@shared/assets/icons/newspaper.svg';
import SlashCircle from '@shared/assets/icons/slash-circle.svg';

import './styles/styles.css';

const problemCards = [
  {
    icon: Newspaper,
    alt: 'newspapper icon',
    title: 'Too Much Market Noise',
    description: `
	  The overwhelming amount of financial news, trends, and expert opinions
 	  makes it hard to identify profitable investments.`,
    titleClass: 'problem-title-much',
    descriptionClass: 'problem-description-newspapper',
  },
  {
    icon: GraphDownArrow,
    alt: 'GraphDownArrow icon',
    title: 'Emotional Decision-Making',
    description: 'Investors often make impulsive choices based on fear or hype, leading to financial losses.',
    titleClass: 'problem-title-emotion',
    descriptionClass: 'problem-description-graph',
  },
  {
    icon: SlashCircle,
    alt: 'slash circle icon',
    title: 'Lack of Reliable Insights',
    description: `
	  Without access to real-time, AI-driven analytics, 
	  finding the best stocks, brokers, and strategies becomes a guessing game.`,
    titleClass: 'problem-title-lack',
    descriptionClass: 'problem-description-slash',
  },
];

export const ProblemSection = (): JSX.Element => {
  return (
    <section className={classNames('problem-section')}>
      <SectionTitle
        section="Problem"
        title="Investing is complicated and risky"
        description={`
          Many investors struggle to find the best opportunities.
          Market volatility, unreliable data, and emotional decision-making
          often lead to poor investments.
        `}
      />

      <div className={classNames('problem-cards-wrapper')}>
        {problemCards.map((card, index) => (
          <ProblemCard key={index} {...card} />
        ))}
      </div>
    </section>
  );
};
