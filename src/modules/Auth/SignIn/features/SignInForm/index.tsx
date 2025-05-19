import { useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { AuthTypes } from '@modules/Auth/shared/types/authTypes';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';

import './styles/styles.css';
import '../../../shared/UI/СontinueButton/styles/styles.css';

import { useAuthenticateUserMutation } from '@global/api/auth/auth.api';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInEmailOnlySchema, signInSchema } from '@shared/validation/sign-in.schema';

type SignInFormInputs = {
  email: string;
  password?: string;
};

export const SignInForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [authenticateUser, { isError }] = useAuthenticateUserMutation();
  const [authError, setAuthError] = useState<string | null>(null);
  const schema = showPasswordInput ? signInSchema : signInEmailOnlySchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignInFormInputs): Promise<void> => {
    if (!showPasswordInput && data.email) {
      setShowPasswordInput(true);
      return;
    }

    await authenticateUser({ ...data, password: data.password || '' })
      .unwrap()
      .then((data) => {
        console.log('Login successful:', data.user);
        navigate(AppRoutes.SYSTEM.path);
      })
      .catch((err: Error) => {
        if (err) {
          setAuthError('Email or password is incorrect');
        }
      });
  };

  return (
    <div className={classNames('sign-in-form-container')}>
      <AuthHeader title="Welcome" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames('sign-in-form-inputs-group')}>
          <>
            <input
              className={classNames('input-email-field', { error: errors.email || isError })}
              {...register('email')}
              placeholder="Email"
            />
            {errors.email && <span className={classNames('error-field-label')}>{errors.email.message}</span>}
          </>
          {showPasswordInput ? (
            <>
              <input
                className={classNames('input-email-field', { error: errors.email || isError })}
                {...register('password')}
                type={'password'}
                placeholder="Password"
              />
              {errors.password && <span className={classNames('error-field-label')}>{errors.password.message}</span>}
            </>
          ) : null}
        </div>
        {isError && <span className={classNames('error-field-label')}>{authError}</span>}
        <button className={classNames('continue-button')} type={'submit'}>
          {showPasswordInput ? 'Login' : 'Continue'}
        </button>
      </form>
      <div className={classNames({ 'auth-proposal-shifted': showPasswordInput })}>
        <AuthProposal type={showPasswordInput ? AuthTypes.REFRESH_PASSWORD : AuthTypes.SIGN_IN} />
      </div>

      {!showPasswordInput && <SocialAuth />}
    </div>
  );
};
