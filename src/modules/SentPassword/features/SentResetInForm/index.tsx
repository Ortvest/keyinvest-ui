import { useEffect } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { PasswordResetDetails } from '@modules/ChangePassword/features/PasswordResetDetails';
import { EmailButton } from '@modules/SentPassword/features/EmailButton';

import './styles/styles.css';

import { useLocalStorage } from '@uidotdev/usehooks';

export const SentResetInForm = (): JSX.Element => {
  const [email, setEmail] = useLocalStorage<string>('resetEmail', '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setEmail('');
    }
  }, [email, setEmail]);

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
