import { useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputPassword } from '@modules/Auth/shared/UI/InputPassword';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';

import './styles/styles.css';

export const ChangePasswordForm = (): JSX.Element => {
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
      <AuthHeader title={'Change Password'} />
      <form className={classNames('change-password-form')}>
        <InputPassword
          password={password}
          onPasswordChange={onHandlePasswordChange}
          placeholder="Enter new password"
          name="password"
          className={classNames('password-input')}
        />
        <InputPassword
          password={confirmPassword}
          onPasswordChange={onHandleConfirmPasswordChange}
          placeholder="Re-enter the password"
          name="confirmPassword"
          className={classNames('confirm-password-input')}
        />
      </form>
      <div className={classNames('button-container')}>
        <ContinueButton onHandleContinueClick={onHandleSubmit} />
      </div>
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
    </div>
  );
};
