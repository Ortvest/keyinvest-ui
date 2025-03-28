import { useState } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { setError, setLoading, setUser } from '@global/store/slices/login.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { AuthTypes } from '@modules/Auth/shared/types/authTypes';
import { InputPassword } from '@modules/Auth/shared/UI/InputPassword';
import { SocialAuth } from '@modules/Auth/shared/UI/SocialAuth';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './styles/styles.css';

import { useAuthenticateUserMutation } from '@global/api/auth.api';

export const SignInForm = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const [authenticateUser, { isLoading }] = useAuthenticateUserMutation();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onHandleContinueClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!showPasswordInput) {
      setShowPasswordInput(true);
    } else {
      await handleLogin();
    }
  };

  const onHandleGoBackClick = (): void => {
    setShowPasswordInput(false);
    setErrorState(null);
  };

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      setErrorState('Please fill in both email and password.');
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const userData = await authenticateUser({ email, password }).unwrap();

      localStorage.setItem('user', JSON.stringify(userData.user));

      dispatch(setUser(userData.user));

      navigate(AppRoutes.MAIN.path);
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(setError(err.message || 'Something went wrong'));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classNames('sign-in-form')}>
      <AuthHeader title="Welcome" />
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

      {error && <p className="error-message">{error}</p>}

      {!showPasswordInput && <ContinueButton onHandleContinueClick={onHandleContinueClick} />}

      <div className={classNames({ 'auth-proposal-shifted': showPasswordInput })}>
        <AuthProposal type={showPasswordInput ? AuthTypes.REFRESH_PASSWORD : AuthTypes.SIGN_IN} />
      </div>

      {showPasswordInput && (
        <>
          <ContinueButton onHandleContinueClick={onHandleContinueClick} disabled={isLoading} />
          <div>
            <GoBackLink onClick={onHandleGoBackClick} />
          </div>
        </>
      )}

      {!showPasswordInput && <SocialAuth />}
    </div>
  );
};
