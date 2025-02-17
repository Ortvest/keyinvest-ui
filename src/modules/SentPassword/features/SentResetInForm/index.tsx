import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { Privacy } from '@modules/Auth/shared/Privacy';
import { PasswordResetDetails } from '@modules/ChangePassword/features/PasswordResetDetails';
import { EmailButton } from '@modules/SentPassword/features/EmailButton';

import './styles/styles.css';

export const SentResetInForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.warn('No email found in localStorage');
    }
  }, []);

  const onHandleContinueClick = (): void => {
    window.location.href = 'https://mail.google.com';
  };

  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_SEND_PASSWORD_RESET.path);
  };

  return (
    <div className={classNames('send-in-form')}>
      <div className={classNames('auth-header')}>
        <AuthHeader title={'Successful!'} />
      </div>
      <div className={classNames('auth-proposal')}>
        <PasswordResetDetails type="email-sent" email={email} />
      </div>
      <div className={classNames('email-button')}>
        <EmailButton onOpenEmailClick={onHandleContinueClick} />
      </div>
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
      <div className={classNames('privacy-text')}>
        <Privacy />
      </div>
    </div>
  );
};
