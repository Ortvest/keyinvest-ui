import { useState } from 'react';

import classNames from 'classnames';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';

import './styles/styles.css';

type Step = 'email' | 'password' | 'confirmation';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  step: Step;
};

export const RegistrationForm = (): JSX.Element => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    step: 'email',
  });

  const isPasswordMatch = formState.password === formState.confirmPassword;

  const handleChange = (key: keyof FormState, value: string | Step): void => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const onContinueHandler = (): void => {
    handleChange(
      'step',
      formState.step === 'email' ? 'password' : formState.step === 'password' ? 'confirmation' : formState.step
    );
  };

  const onGoBackHandler = (): void => {
    if (formState.step === 'password') {
      setFormState((prev) => ({ ...prev, step: 'email' }));
    } else if (formState.step === 'confirmation') {
      setFormState((prev) => ({ ...prev, step: 'password' }));
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
