import classNames from 'classnames';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthTypes } from '@modules/Auth/shared/types/authTypes';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';

import './styles/styles.css';

type Step = 'email' | 'password' | 'confirmation';

type RegistrationNavigationProps = {
  step: Step;
  isPasswordMatch: boolean;
  onContinue: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onGoBack: () => void;
};

export const RegistrationNavigation = ({
  step,
  isPasswordMatch,
  onContinue,
  onGoBack,
}: RegistrationNavigationProps): JSX.Element => {
  const onHandleContinueClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onContinue(e);
  };

  return (
    <>
      {step !== 'confirmation' ? (
        <ContinueButton onHandleContinueClick={onHandleContinueClick} />
      ) : (
        <button className={classNames('submit-button')} disabled={!isPasswordMatch}>
          Submit
        </button>
      )}
      {step === 'email' && (
        <>
          <AuthProposal type={AuthTypes.SIGN_UP} />
          <SocialAuth />
        </>
      )}
      {step !== 'email' && <GoBackLink onClick={onGoBack} />}
    </>
  );
};
