import { useState } from 'react';

import classNames from 'classnames';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

import './styles/styles.css';

import { useSendVerificationCodeMutation, useVerifyCodeMutation } from '@global/api/auth.api';

type FormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  step: StepNames;
};

export const RegistrationForm = (): JSX.Element => {
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [formState, setFormState] = useState<FormState>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    verificationCode: '',
    step: StepNames.EMAIL,
  });

  const isPasswordMatch = formState.password === formState.confirmPassword;

  const handleChange = (key: keyof FormState, value: string): void => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSendVerificationCode = async (): Promise<void> => {
    try {
      const response = await sendVerificationCode({ email: formState.email }).unwrap();
      console.log('Kod send:', response);

      setFormState((prev) => ({ ...prev, step: StepNames.VERIFICATION }));
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
  };

  const onVerifyCode = async (): Promise<void> => {
    try {
      await verifyCode({ email: formState.email, code: formState.verificationCode }).unwrap();
      setFormState((prev) => ({ ...prev, step: StepNames.USERNAME }));
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Invalid code. Please try again.');
    }
  };

  const onContinueHandler = (): void => {
    if (formState.step === StepNames.EMAIL) {
      onSendVerificationCode();
    } else if (formState.step === StepNames.VERIFICATION) {
      onVerifyCode();
    } else {
      handleChange(
        'step',
        formState.step === StepNames.USERNAME
          ? StepNames.PASSWORD
          : formState.step === StepNames.PASSWORD
            ? StepNames.CONFIRMATION
            : formState.step
      );
    }
  };

  const onGoBackHandler = (): void => {
    if (formState.step === StepNames.VERIFICATION) {
      setFormState((prev) => ({ ...prev, step: StepNames.EMAIL }));
    } else if (formState.step === StepNames.USERNAME) {
      setFormState((prev) => ({ ...prev, step: StepNames.VERIFICATION }));
    } else if (formState.step === StepNames.PASSWORD) {
      setFormState((prev) => ({ ...prev, step: StepNames.USERNAME }));
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
