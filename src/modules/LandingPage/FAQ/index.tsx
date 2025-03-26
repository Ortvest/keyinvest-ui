import classNames from 'classnames';

import { FaqCards } from '@modules/LandingPage/FAQ/layout/FaqCards';
import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import './styles/styles.css';

const FaqData = [
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
	  and historical patterns to provide investment recommendations with high accuracy.`,
  },
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
	  and historical patterns to provide investment recommendations with high accuracy.`,
  },
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
	  and historical patterns to provide investment recommendations with high accuracy.`,
  },
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
	  and historical patterns to provide investment recommendations with high accuracy.`,
  },
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
	  and historical patterns to provide investment recommendations with high accuracy.`,
  },
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
	  and historical patterns to provide investment recommendations with high accuracy.`,
  },
];

export const FaqSection = (): JSX.Element => {
  return (
    <section className={classNames('faq-section-wrapper')}>
      <SectionTitle
        section="FAQ"
        title="Frequently Asked Questions"
        description="Here are some common questions about making smarter investments with KeyInvest AI."
      />

      <div className={classNames('faq-section-list')}>
        {FaqData.map((benefit, index) => (
          <FaqCards key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
};
