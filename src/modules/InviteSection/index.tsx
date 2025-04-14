import classNames from 'classnames';

import { InviteForm } from '@modules/InviteSection/layout/InviteForm';
import { SectionTitle } from '@modules/LandingPage/shared/SectionTitle';

import './styles/styles.css';

export const InviteSection = (): JSX.Element => {
  return (
    <section className={classNames('invite-section')}>
      <SectionTitle
        title="Join our Beta Testing Program"
        description={`
          Be the first to explore our AI-powered investment platform. Sign up for early 
		  access and help us shape the future of investing.
        `}
      />
      <div className="invite-form-wrapper">
        <InviteForm />
      </div>
    </section>
  );
};
