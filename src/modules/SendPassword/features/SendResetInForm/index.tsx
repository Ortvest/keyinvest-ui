import { useEffect } from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { GoBackLink } from '@modules/Auth/shared/GoBackLink';
import { AuthHeader } from '@modules/Auth/shared/Header';
import { InputEmailField } from '@modules/Auth/shared/InputEmailField';
import { ContinueButton } from '@modules/Auth/shared/UI/СontinueButton';
import { PasswordResetDetails } from '@modules/ChangePassword/features/PasswordResetDetails';

import './styles/styles.css';

import { useSendPasswordResetMutation } from '@global/api/auth.api';
import { useLocalStorage } from '@uidotdev/usehooks';

export const SendResetInForm = (): JSX.Element => {
  const [email, setEmail] = useLocalStorage<string>('resetEmail', '');

  const navigate = useNavigate();
  const [sendPasswordReset, { isLoading, error }] = useSendPasswordResetMutation();

  useEffect(() => {
    localStorage.removeItem('resetEmail');
  }, []);

  const onHandleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onHandleContinueClick = async (): Promise<void> => {
    try {
      await sendPasswordReset({ email }).unwrap();
      navigate(AppRoutes.AUTH_SENT_PASSWORD_RESET.path.replace(':email', email));
    } catch (err) {
      console.error('Error when sending the request:', err);
    }
  };

  const onHandleGoBackClick = (): void => {
    navigate(AppRoutes.AUTH_LOG_IN.path);
  };

  return (
    <div className={classNames('send-in-form')}>
      <AuthHeader title={'Restore access'} />
      <div className={classNames('input-email')}>
        <InputEmailField value={email} onChange={onHandleEmailChange} />
      </div>
      <div className={classNames('auth-proposal')}>
        <PasswordResetDetails type="send-reset" />
      </div>
      <div>
        <ContinueButton onHandleContinueClick={onHandleContinueClick} disabled={isLoading} />
      </div>
      {error && <p className="error-message">Error sending reset email</p>}
      <div className={classNames('go-back-link')}>
        <GoBackLink onClick={onHandleGoBackClick} />
      </div>
    </div>
  );
};
