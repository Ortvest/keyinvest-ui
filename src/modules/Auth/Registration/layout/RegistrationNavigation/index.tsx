import classNames from 'classnames';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';

import './styles/styles.css';

type Step = 'email' | 'password' | 'confirmation';

type RegistrationNavigationProps = {
  step: Step;
  isPasswordMatch: boolean;
  onContinue: () => void;
  onGoBack: () => void;
};

export const RegistrationNavigation = ({
  step,
  isPasswordMatch,
  onContinue,
  onGoBack,
}: RegistrationNavigationProps): JSX.Element => (
  <>
    {step !== 'confirmation' ? (
      <ContinueButton onClick={onContinue} />
    ) : (
      <button className={classNames('submit-button')} disabled={!isPasswordMatch}>
        Submit
      </button>
    )}
    {step === 'email' && (
      <>
        <AuthProposal type={'signup'} />
        <SocialAuth />
      </>
    )}
    {step !== 'email' && <GoBackLink onClick={onGoBack} />}
  </>
);
