import { useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputPassword } from '@modules/Auth/shared/UI/InputPassword';
import { RuleText } from '@modules/Auth/shared/UI/RuleText';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';
import { GoBackLink } from '@modules/Auth/SignIn/features/GoBackLink';

import './styles/styles.css';

export const ChangePasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onHandlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onHandleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_SENT_PASSWORD_RESET.path);
  };

  const onHandleSubmit = (): void => {
    if (password !== confirmPassword) {
      return;
    }
  };

  return (
    <div className={classNames('change-in-form')}>
      <div className={classNames('auth-header')}>
        <AuthHeader title={'Change Password'} />
      </div>
      <form className={classNames('change-password-form')}>
        <div className={classNames('input-group')}>
          <InputPassword
            password={password}
            onPasswordChange={onHandlePasswordChange}
            placeholder="Enter new password"
            name="password"
            className={classNames('password-input')}
          />
        </div>
        <div className={classNames('input-group')}>
          <InputPassword
            password={confirmPassword}
            onPasswordChange={onHandleConfirmPasswordChange}
            placeholder="Re-enter the password"
            name="confirmPassword"
            className={classNames('confirm-password-input')}
          />
        </div>
      </form>
      <div className={classNames('button-container')}>
        <ContinueButton onClick={onHandleSubmit} />
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
