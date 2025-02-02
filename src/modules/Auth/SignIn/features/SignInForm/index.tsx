import { useState } from 'react';

import classNames from 'classnames';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { EmailInput } from '@modules/Auth/shared/UI/InputEmail';
import { InputPassword } from '@modules/Auth/shared/UI/InputPassword';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';
import { GoBackLink } from '@modules/Auth/SignIn/features/GoBackLink';
import { RuleText } from '@modules/Auth/SignIn/features/RuleText';

import './styles/styles.css';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onHandleContinueClick = () => {
    if (!showPasswordInput) {
      setShowPasswordInput(true);
    } else {
      handleContinueLogic();
    }
  };

  const onHandleGoBackClick = () => {
    setShowPasswordInput(false);
  };

  const handleContinueLogic = () => {
    console.log('Continue button clicked!');
  };

  return (
    <div className={classNames('sign-in-form')}>
      <div className={classNames('auth-header')}>
        <AuthHeader title={'Welcome'} />
      </div>

      <div className={classNames('input-email')}>
        <EmailInput email={email} onChange={handleEmailChange} />
      </div>

      {showPasswordInput && (
        <div className={classNames('input-password')}>
          <InputPassword
            password={password}
            onPasswordChange={handlePasswordChange}
            placeholder="Password"
            name="password"
          />
        </div>
      )}

      {!showPasswordInput && <ContinueButton onClick={onHandleContinueClick} />}

      <div className={classNames('auth-proposal', { 'auth-proposal-shifted': showPasswordInput })}>
        <AuthProposal type={showPasswordInput ? 'refresh-password' : 'signin'} />
      </div>

      {showPasswordInput && (
        <>
          <ContinueButton onClick={onHandleContinueClick} />
          <div className={classNames('go-back-link')}>
            <GoBackLink onClick={onHandleGoBackClick} />
          </div>
        </>
      )}

      {!showPasswordInput && (
        <div className={classNames('or-separator')}>
          <SocialAuth />
        </div>
      )}

      <div className={classNames('rule-text')}>
        <RuleText />
      </div>
    </div>
  );
};
