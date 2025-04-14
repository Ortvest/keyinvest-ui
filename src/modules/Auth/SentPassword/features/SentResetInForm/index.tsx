import { useEffect } from 'react';

import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { PasswordResetDetails } from '@modules/Auth/ChangePassword/features/PasswordResetDetails';
import { EmailButton } from '@modules/Auth/SentPassword/features/EmailButton';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';

import './styles/styles.css';
import '../../styles.css';

export const SentResetInForm = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email || '';

  useEffect(() => {
    if (!email) {
      navigate(AppRoutes.AUTH_SEND_PASSWORD_RESET.path);
    }
  }, [email, navigate]);

  const onHandleContinueClick = (): void => {
    window.location.href = 'https://mail.google.com';
  };

  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_SEND_PASSWORD_RESET.path);
  };

  return (
    <div className={classNames('send-in-form')}>
      <AuthHeader title="Successful!" />
      <div className={classNames('auth-proposal')}>
        <PasswordResetDetails type="email-sent" email={email} />
      </div>
      <EmailButton onOpenEmailClick={onHandleContinueClick} />
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
    </div>
  );
};
