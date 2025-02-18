import classNames from 'classnames';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthTypes } from '@modules/Auth/shared/types/authTypes';
import { StepNames } from '@modules/Auth/shared/types/stepNames';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';

import './styles/styles.css';

type RegistrationNavigationProps = {
  step: keyof typeof StepNames;
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
      {step !== StepNames.CONFIRMATION ? (
        <ContinueButton onHandleContinueClick={onHandleContinueClick} />
      ) : (
        <button className={classNames('submit-button')} disabled={!isPasswordMatch}>
          Submit
        </button>
      )}
      {step === StepNames.EMAIL && (
        <>
          <AuthProposal type={AuthTypes.SIGN_UP} />
          <SocialAuth />
        </>
      )}
      {step !== StepNames.EMAIL && <GoBackLink onClick={onGoBack} />}
    </>
  );
};
