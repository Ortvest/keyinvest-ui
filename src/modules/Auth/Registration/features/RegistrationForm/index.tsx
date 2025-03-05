import { useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { setError, setLoading, setUser } from '@global/store/slices/register.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { RegistrationNavigation } from '@modules/Auth/Registration/layout/RegistrationNavigation';
import { RegistrationSteps } from '@modules/Auth/Registration/layout/RegistrationSteps';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './styles/styles.css';

import { useRegisterUserMutation } from '@global/api/auth.api';

type FormState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  step: StepNames;
};

export const RegistrationForm = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    step: StepNames.EMAIL,
  });

  const isPasswordMatch = formState.password === formState.confirmPassword;

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleChange = (key: keyof FormState, value: string): void => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onContinueHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (formState.step === StepNames.CONFIRMATION && isPasswordMatch) {
      try {
        dispatch(setLoading(true));

        const response = await registerUser({
          username: formState.username,
          email: formState.email,
          password: formState.password,
        }).unwrap();

        dispatch(setUser(response.user));

        navigate(AppRoutes.AUTH_LOG_IN.path);
      } catch (err) {
        console.error('Registration failed:', err);
        if (err instanceof Error) {
          dispatch(setError(err.message || 'Something went wrong'));
        } else {
          dispatch(setError('An unknown error occurred'));
        }
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setFormState((prev) => ({
        ...prev,
        step:
          prev.step === StepNames.EMAIL
            ? StepNames.USERNAME
            : prev.step === StepNames.USERNAME
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
        prev.step === StepNames.USERNAME
          ? StepNames.EMAIL
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
