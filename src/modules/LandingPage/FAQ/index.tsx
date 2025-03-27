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
    title: 'Is KeyInvest AI suitable for beginners?',
    description: 'Absolutely! Our AI simplifies investment decisions, making it easy for beginners to get started.',
  },
  {
    title: 'How secure is my data with KeyInvest?',
    description: 'We use advanced encryption and security measures to keep your data safe and confidential.',
  },
  {
    title: 'How does KeyInvest’s AI work?',
    description: `Our AI analyzes real-time market data, trends, 
      and historical patterns to provide investment recommendations with high accuracy.`,
  },
  {
    title: 'Is KeyInvest AI suitable for beginners?',
    description: 'Absolutely! Our AI simplifies investment decisions, making it easy for beginners to get started.',
  },
  {
    title: 'How secure is my data with KeyInvest?',
    description: 'We use advanced encryption and security measures to keep your data safe and confidential.',
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

      <dl className={classNames('faq-section-list')}>
        {FaqData.map((faq, index) => (
          <FaqCards key={index} {...faq} />
        ))}
      </dl>
    </section>
  );
};
