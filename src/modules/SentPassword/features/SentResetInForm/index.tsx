import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { AuthProposalDetails } from '@modules/Auth/shared/AuthProposal/Layout/AuthProposalDetails';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { RuleText } from '@modules/Auth/shared/UI/RuleText';
import { GoBackLink } from '@modules/Auth/SignIn/features/GoBackLink';
import { EmailButton } from '@modules/SentPassword/features/EmailButton';

import './styles/styles.css';

export const SentResetInForm = () => {
  const [email, setEmail] = useState('');
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
        <AuthProposalDetails type="email-sent" email={email} />
      </div>
      <div>
        <EmailButton onClick={onHandleContinueClick} />
      </div>
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
      <div className={classNames('rule-text')}>
        <RuleText />
      </div>
    </div>
  );
};
