import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { PasswordConditions } from '@modules/Auth/Registration/features/PasswordConditions';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';

import './styles/styles.css';
import '../../styles.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '@shared/validation/reset-password.schema';
import { useState } from 'react';
import { useResetPasswordMutation } from '@global/api/auth/auth.api';

type ResetPasswordFormInputs = {
  password: string;
  confirmPassword: string;
}
export const ChangePasswordForm = (): JSX.Element => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onTouched',
  });
  const watchAllFields = watch();

  const [resetPasswordError, setResetPasswordError] = useState<string>('');

  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [resetPassword] = useResetPasswordMutation();


  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_SENT_PASSWORD_RESET.path);
  };

  const onSubmit = (data: ResetPasswordFormInputs): void => {
    resetPassword({ password: data.password, token: token || '' })
      .unwrap()
      .then(() => {
        navigate(AppRoutes.SYSTEM.path);
      })
      .catch((e) => setResetPasswordError(e?.data?.errors));
  };
  return (
    <div className={classNames('change-in-form')}>
      <AuthHeader title="Change Password" />
      <form onSubmit={handleSubmit(onSubmit)} className={classNames('change-password-form')}>
        <div className={classNames('passwords-container')}>
          <input
            className={classNames('input-email-field', { error: errors.password || resetPasswordError })}
            {...register('password')}
            placeholder="Password"
            type="password"
          />
          <input
            className={classNames('input-email-field', { error: errors.confirmPassword || resetPasswordError })}
            {...register('confirmPassword')}
            placeholder="Confirm Password"
            type="password"
          />
          {errors.confirmPassword && (
            <span className={classNames('error-field-label')}>{errors.confirmPassword.message}</span>
          )}
          {resetPasswordError && <p className={classNames('error-field-label')}>{resetPasswordError}</p>}
          <PasswordConditions
            conditions={{
              minLength: (watchAllFields.password || '').length >= 8,
              hasDigit: /\d/.test(watchAllFields.password || ''),
              hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(watchAllFields.password || ''),
              passwordsMatch: watchAllFields.password === watchAllFields.confirmPassword,
            }}
          />
        </div>
        <div className={classNames('button-container')}>
          <button className={classNames('continue-button')}>Continue</button>
        </div>
      </form>
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
    </div>
  );
};
