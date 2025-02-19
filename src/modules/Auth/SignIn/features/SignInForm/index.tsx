import { useState } from 'react';

import classNames from 'classnames';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { AuthTypes } from '@modules/Auth/shared/types/authTypes';
import { InputPassword } from '@modules/Auth/shared/UI/InputPassword';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';

import './styles/styles.css';

export const SignInForm = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onHandleContinueClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (!showPasswordInput) {
      setShowPasswordInput(true);
    } else {
      handleContinueLogic();
    }
  };

  const onHandleGoBackClick = (): void => {
    setShowPasswordInput(false);
  };

  const handleContinueLogic = (): void => {
    console.log('Continue button clicked!');
  };

  return (
    <div className={classNames('sign-in-form')}>
      <div className={classNames('auth-header')}>
        <AuthHeader title={'Welcome'} />
      </div>

      <div className={classNames('input-email')}>
        <InputEmailField value={email} onChange={handleEmailChange} />

        {showPasswordInput && (
          <div className={classNames('input-password')}>
            <InputPassword
              password={password}
              onPasswordChange={handlePasswordChange}
              placeholder="Password"
              name="password"
              className={classNames('password-field')}
            />
          </div>
        )}
      </div>

      {!showPasswordInput && <ContinueButton onHandleContinueClick={onHandleContinueClick} />}

      <div className={classNames({ 'auth-proposal-shifted': showPasswordInput })}>
        <AuthProposal type={showPasswordInput ? AuthTypes.REFRESH_PASSWORD : AuthTypes.SIGN_IN} />
      </div>

      {showPasswordInput && (
        <>
          <ContinueButton onHandleContinueClick={onHandleContinueClick} />
          <div>
            <GoBackLink onClick={onHandleGoBackClick} />
          </div>
        </>
      )}

      {!showPasswordInput && <SocialAuth />}
    </div>
  );
};
