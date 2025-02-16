import { useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { useSendPasswordResetMutation } from '@modules/Auth/shared/api/auth.api';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { Privacy } from '@modules/Auth/shared/Privacy';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';
import { PasswordResetDetails } from '@modules/ChangePassword/features/PasswordResetDetails';

import './styles/styles.css';

export const SendResetInForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();
  const [sendPasswordReset, { isLoading, error }] = useSendPasswordResetMutation();

  const onHandleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onHandleContinueClick = async (): Promise<void> => {
    try {
      await sendPasswordReset({ email }).unwrap();
      localStorage.setItem('resetEmail', email);
      navigate(AppRoutes.AUTH_SENT_PASSWORD_RESET.path.replace(':email', email));
    } catch (err) {
      console.error('Error when sending the request:', err);
    }
  };

  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_LOG_IN.path);
  };

  return (
    <div className={classNames('send-in-form')}>
      <div className={classNames('auth-header')}>
        <AuthHeader title={'Restore access'} />
      </div>
      <div className={classNames('input-email')}>
        <InputEmailField value={email} onChange={onHandleEmailChange} />
      </div>
      <div className={classNames('auth-proposal')}>
        <PasswordResetDetails type="send-reset" />
      </div>
      <div>
        <ContinueButton onClick={onHandleContinueClick} disabled={isLoading} />
      </div>
      {error && <p className="error-message">Error sending reset email</p>}
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
      <div className={classNames('rule-text')}>
        <Privacy />
      </div>
    </div>
  );
};
