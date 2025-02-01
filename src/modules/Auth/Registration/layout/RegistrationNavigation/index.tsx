import classNames from 'classnames';

import { SignInLink } from '@modules/Auth/Registration/features/SignInLink';
import { SocialAuth } from '@modules/Auth/Registration/features/SocialAuth';

import './styles/styles.css';

type RegistrationNavigationProps = {
  step: 1 | 2 | 3;
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
    {step < 3 ? (
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
    {step === 1 && (
      <>
        <SignInLink />
        <SocialAuth />
      </>
    )}
    {step >= 2 && (
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
