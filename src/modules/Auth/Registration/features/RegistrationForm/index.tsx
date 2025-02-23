import { useState } from 'react';

import classNames from 'classnames';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

import './styles/styles.css';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  step: StepNames;
};

export const RegistrationForm = (): JSX.Element => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    step: StepNames.EMAIL,
  });

  const isPasswordMatch = formState.password === formState.confirmPassword;

  const handleChange = (key: keyof FormState, value: string | StepNames): void => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const onContinueHandler = (): void => {
    handleChange(
      'step',
      formState.step === StepNames.EMAIL
        ? StepNames.PASSWORD
        : formState.step === StepNames.PASSWORD
          ? StepNames.CONFIRMATION
          : formState.step
    );
  };

  const onGoBackHandler = (): void => {
    if (formState.step === StepNames.PASSWORD) {
      setFormState((prev) => ({ ...prev, step: StepNames.EMAIL }));
    } else if (formState.step === StepNames.CONFIRMATION) {
      setFormState((prev) => ({ ...prev, step: StepNames.PASSWORD }));
    }
  };

  return (
    <form className={classNames('form-wrapper')}>
      <div className={classNames('inputs-container')}>
        <RegistrationSteps formState={formState} handleChange={handleChange} />
      </div>
      <RegistrationNavigation
        step={formState.step}
        isPasswordMatch={isPasswordMatch}
        onContinue={onContinueHandler}
        onGoBack={onGoBackHandler}
      />
    </form>
  );
};
