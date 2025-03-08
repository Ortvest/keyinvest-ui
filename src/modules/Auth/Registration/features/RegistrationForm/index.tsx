import { useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { setError, setLoading } from '@global/store/slices/register.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './styles/styles.css';

import { useRegisterUserMutation, useSendVerificationCodeMutation, useVerifyCodeMutation } from '@global/api/auth.api';

type FormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
  step: StepNames;
};

export const RegistrationForm = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

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
      await sendVerificationCode({ email: formState.email }).unwrap();
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

  const onRegisterUser = async (): Promise<void> => {
    if (!isPasswordMatch) return;

    try {
      dispatch(setLoading(true));

      await registerUser({
        username: formState.username,
        email: formState.email,
        password: formState.password,
      }).unwrap();

      navigate(AppRoutes.AUTH_LOG_IN.path);
    } catch (err) {
      console.error('Registration failed:', err);
      dispatch(setError(err instanceof Error ? err.message || 'Something went wrong' : 'An unknown error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onContinueHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formState.step === StepNames.EMAIL) {
      await onSendVerificationCode();
    } else if (formState.step === StepNames.VERIFICATION) {
      await onVerifyCode();
    } else if (formState.step === StepNames.CONFIRMATION) {
      await onRegisterUser();
    } else {
      setFormState((prev) => ({
        ...prev,
        step:
          prev.step === StepNames.USERNAME
            ? StepNames.PASSWORD
            : prev.step === StepNames.PASSWORD
              ? StepNames.CONFIRMATION
              : prev.step,
      }));
    }
  };

  const onGoBackHandler = (): void => {
    setFormState((prev) => ({
      ...prev,
      step:
        prev.step === StepNames.VERIFICATION
          ? StepNames.EMAIL
          : prev.step === StepNames.USERNAME
            ? StepNames.VERIFICATION
            : prev.step === StepNames.PASSWORD
              ? StepNames.USERNAME
              : prev.step === StepNames.CONFIRMATION
                ? StepNames.PASSWORD
                : prev.step,
    }));
  };

  return (
    <form className={classNames('form-wrapper')} onSubmit={onContinueHandler}>
      <div className={classNames('inputs-container')}>
        <RegistrationSteps formState={formState} handleChange={handleChange} />
      </div>
      <RegistrationNavigation
        step={formState.step}
        isPasswordMatch={isPasswordMatch}
        onContinue={onContinueHandler}
        onGoBack={onGoBackHandler}
        isLoading={isLoading}
      />
    </form>
  );
};
