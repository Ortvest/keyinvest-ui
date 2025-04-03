import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { PasswordResetDetails } from '@modules/Auth/ChangePassword/features/PasswordResetDetails';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';

import './styles/styles.css';
import '../../styles.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { sendResetEmailSchema } from '@shared/validation/send-reset-email.schema';
import { useSendPasswordResetMutation } from '@global/api/auth/auth.api';

type SendResetPasswordEmailForm = {
  email: string;
};
export const SendResetInForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [sendPasswordReset, { error }] = useSendPasswordResetMutation();
  const [currentEmail, setCurrentEmail] = useState<string>('');

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SendResetPasswordEmailForm>({
    resolver: yupResolver(sendResetEmailSchema),
    mode: 'onTouched',
  });

  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_LOG_IN.path);
  };

  const onSubmit = async (data: SendResetPasswordEmailForm): Promise<void> => {
    await sendPasswordReset({ email: data.email }).unwrap();
    navigate(AppRoutes.AUTH_SENT_PASSWORD_RESET.path.replace(':email', data.email));
  };

  useEffect(() => {
    const currentEmail = watch('email');

    if (currentEmail) {
      setCurrentEmail(currentEmail);
    }
  }, [watch]);
  return (
    <div className={classNames('send-in-form')}>
      <AuthHeader title={'Restore access'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <input
            className={classNames('input-email-field', { error: errors.email })}
            {...register('email')}
            placeholder="Email"
          />
          {errors.email && <span className={classNames('error-field-label')}>{errors.email.message}</span>}
        </>
        <button className={classNames('continue-button')} type={'submit'}>
          Continue
        </button>
      </form>
      <div className={classNames('auth-proposal')}>
        <PasswordResetDetails email={currentEmail} type="send-reset" />
      </div>
      {error && <p className="error-message">Error sending reset email</p>}
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
    </div>
  );
};
