import classNames from 'classnames';

import { SignInLink } from '@modules/Auth/Registration/features/SignInLink';
import { SocialAuth } from '@modules/Auth/Registration/features/SocialAuth';

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
      <button
        className={classNames('submit-button')}
        onClick={(e) => {
          e.preventDefault();
          onContinue();
        }}>
        Continue
      </button>
    ) : (
      <button className={classNames('submit-button')} disabled={!isPasswordMatch}>
        Submit
      </button>
    )}
    {step === 'email' && (
      <>
        <SignInLink />
        <SocialAuth />
      </>
    )}
    {step !== 'email' && (
      <a
        href="#"
        className={classNames('back-link')}
        onClick={(e) => {
          e.preventDefault();
          onGoBack();
        }}>
        Go Back
      </a>
    )}
  </>
);
