import { useCallback, useEffect, useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { PasswordConditions } from '@modules/Auth/Registration/features/PasswordConditions';
import { VerificationCodeInput } from '@modules/Auth/Registration/features/VerificationCodeInput';
import { StepNames } from '@modules/Auth/shared/types/stepNames';

import './styles/styles.css';
import '../../styles.css';

import {
  useRegisterUserMutation,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
} from '@global/api/auth/auth.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@shared/validation/sign-up.schema';

type SignUpFormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
};

const getNextStep = (step: StepNames): StepNames | null => {
  switch (step) {
    case 'EMAIL':
      return 'VERIFICATION';
    case 'VERIFICATION':
      return 'USERNAME';
    case 'USERNAME':
      return 'PASSWORD';
    case 'PASSWORD':
      return 'CONFIRMATION';
    case 'CONFIRMATION':
      return 'VERIFICATION';
    default:
      return null;
  }
};

export const RegistrationForm = (): JSX.Element => {
  const navigate = useNavigate();

  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyCode, { isSuccess: isVerifyCodeSuccess }] = useVerifyCodeMutation();
  const [registerUser] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpSchema),
    mode: 'onTouched',
  });

  const watchAllFields = watch();

  const [currentStep, setCurrentStep] = useState<StepNames>(StepNames.EMAIL);

  const handleNextStep = useCallback(async (): Promise<void> => {
    let fieldToValidate: keyof SignUpFormInputs;
    switch (currentStep) {
      case 'EMAIL':
        fieldToValidate = 'email';
        break;
      case 'USERNAME':
        fieldToValidate = 'username';
        break;
      case 'PASSWORD':
        fieldToValidate = 'password';
        break;
      case 'CONFIRMATION':
        fieldToValidate = 'confirmPassword';
        break;
      default:
        fieldToValidate = 'email';
    }

    if (currentStep === StepNames.EMAIL) {
      await sendVerificationCode({ email: getValues('email') }).unwrap();
    }

    const isValid = await trigger(fieldToValidate);
    if (isValid) {
      const nextStep = getNextStep(currentStep);
      if (nextStep) {
        setCurrentStep(nextStep);
      }
    }
  }, [currentStep, getValues, sendVerificationCode, trigger]);

  useEffect(() => {
    if (isVerifyCodeSuccess) {
      handleNextStep();
    }
  }, [isVerifyCodeSuccess, handleNextStep]);

  const onVerifyEmailHandler = async (): Promise<void> => {
    await verifyCode({ email: getValues('email'), code: getValues('verificationCode') });
  };

  const onSubmit = (data: SignUpFormInputs): void => {
    registerUser(data)
      .unwrap()
      .then(() => {
        navigate(AppRoutes.MAIN.path);
      });
  };

  return (
    <div className="inputs-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 'EMAIL' && (
          <>
            <input
              className={classNames('input-email-field', { error: errors.email })}
              {...register('email')}
              placeholder="Email"
            />
            {errors.email && <span className={classNames('error-field-label')}>{errors.email.message}</span>}
          </>
        )}

        {currentStep === 'USERNAME' && (
          <>
            <input
              className={classNames('input-email-field', { error: errors.username })}
              {...register('username')}
              placeholder="Username"
            />
            {errors.username && <span className={classNames('error-field-label')}>{errors.username.message}</span>}
          </>
        )}

        {currentStep === 'PASSWORD' && (
          <div className={classNames('passwords-container')}>
            <input
              className={classNames('input-email-field')}
              {...register('password')}
              placeholder="Password"
              type="password"
            />
            <input
              className={classNames('input-email-field')}
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              type="password"
            />
            {errors.confirmPassword && (
              <span className={classNames('error-field-label')}>{errors.confirmPassword.message}</span>
            )}
            <PasswordConditions
              conditions={{
                minLength: (watchAllFields.password || '').length >= 8,
                hasDigit: /\d/.test(watchAllFields.password || ''),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(watchAllFields.password || ''),
                passwordsMatch: watchAllFields.password === watchAllFields.confirmPassword,
              }}
            />
          </div>
        )}

        {currentStep === 'VERIFICATION' && (
          <>
            <VerificationCodeInput
              onVerificationCodeChange={(newCode) => setValue('verificationCode', newCode)}
              verificationCode={getValues('verificationCode') || ''}
            />
          </>
        )}

        {currentStep === 'VERIFICATION' ? (
          <button className={classNames('submit-button')} type="button" onClick={onVerifyEmailHandler}>
            Verify
          </button>
        ) : currentStep === 'PASSWORD' ? (
          <button className={classNames('submit-button')} type="submit">
            Create
          </button>
        ) : (
          <button className={classNames('submit-button')} type="button" onClick={handleNextStep}>
            Continue
          </button>
        )}
      </form>
    </div>
  );
};
