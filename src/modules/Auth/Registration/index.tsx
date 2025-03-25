import classNames from 'classnames';

import { RegistrationForm } from '@modules/Auth/Registration/features/RegistrationForm';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { Privacy } from '@modules/Auth/shared/Privacy';
import { StepNames } from '@modules/Auth/shared/types/stepNames';
import { ThemeToggle } from '@modules/Auth/ThemeToggle';

import './styles.css';

const getTitle = (step: StepNames): string =>
  step === StepNames.VERIFICATION ? 'Account Verification' : 'Create an account';

export const Registration = (): JSX.Element => {
  return (
    <>
      <ThemeToggle />
      <div className={classNames('registration-wrapper')}>
        <AuthHeader title={getTitle('EMAIL')} />
        <RegistrationForm />
        <Privacy />
      </div>
    </>
  );
};
