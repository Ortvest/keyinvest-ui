import { useState } from 'react';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setError, setLoading, setUser } from '@global/store/slices/login.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { AuthProposal } from '@modules/Auth/shared/AuthProposal';
import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { AuthTypes } from '@modules/Auth/shared/types/authTypes';
import { InputPassword } from '@modules/Auth/shared/UI/InputPassword';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';
import { authenticateUser } from '@modules/Auth/SignIn/features/LoginUser';

import './styles/styles.css';

export const SignInForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

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
      const result = await authenticateUser(email, password);

      const { data, user } = result;

      if (user) {
        console.log('Login successful:', data);
        dispatch(setUser(user));
        navigate(AppRoutes.MAIN.path);
      } else {
        console.log('User not found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={classNames('sign-in-form')}>
      <div className={classNames('auth-header')}>
        <AuthHeader title="Welcome" />
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

      {error && <p className="error-message">{error}</p>}

      {!showPasswordInput && <ContinueButton onHandleContinueClick={onHandleContinueClick} />}

      <div className={classNames({ 'auth-proposal-shifted': showPasswordInput })}>
        <AuthProposal type={showPasswordInput ? AuthTypes.REFRESH_PASSWORD : AuthTypes.SIGN_IN} />
      </div>

      {showPasswordInput && (
        <>
          <ContinueButton onHandleContinueClick={onHandleContinueClick} disabled={loading} />
          <div>
            <GoBackLink onClick={onHandleGoBackClick} />
          </div>
        </>
      )}
    </div>
  );
};
